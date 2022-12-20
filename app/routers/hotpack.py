from fastapi import APIRouter, Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from uuid import uuid4
from datetime import datetime
import requests

from ..models import User
from ..auth_bearer import get_current_user
from ..utils import decode_jwt2user
from ..models import UpdateHotpackModel, GetHotpackModel, MessagePostModel, Message
from ..database import db, get_user_from_db
from ..dependencies import get_token_header
from ..auth_bearer import JWTBearer
from ..configs import HUGGING_FACE_AUTH


router = APIRouter(
    prefix="/hotpack",
    tags=["hotpack"],
    responses={404: {"description": "Not found"}},
)


def score_api(payload):
    API_URL = "https://api-inference.huggingface.co/models/nlptown/bert-base-multilingual-uncased-sentiment"
    headers = {"Authorization": f"Bearer {HUGGING_FACE_AUTH}"}
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()


@router.post('/create', summary="Make Own Hotpack")
async def updateHotpackName(editData: UpdateHotpackModel, current_user: User = Depends(get_current_user)):
    # querying database to check if user already exist
    authUserEmail = current_user.email
    authUserID = current_user.uid

    user = db["users"].find_one({"email": authUserEmail, "uid": authUserID})

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="유저가 존재하지 않습니다."
        )

    db["users"].update_one({"email": authUserEmail}, {
                           "$set": {"hotpackName": editData.hotpackName, "temperature": 0, "messages": [], "count": 0}})

    return {"success": True, "uid": authUserID}


@router.post("/write_message")
def write(data: MessagePostModel):
    score_response = score_api(data.message)[0]

    sorted_score = sorted(
        score_response, key=lambda x: x.get("score"), reverse=True)
    temperature = int(sorted_score[0].get("label")[0])

    createdAt = datetime.now()
    message_uid = uuid4().hex

    message = Message(writer=data.writer, message=data.message,
                      temperature=temperature, createdAt=createdAt, uid=message_uid)

    new_message = db["messages"].insert_one(message.dict())

    db["users"].update_one({"uid": data.hotpackId}, {
        '$push': {'messages': message_uid}, '$inc': {"count": 1, "temperature": temperature}}, upsert=True)

    return {"success": True, "temperature": temperature}


@router.get("/", summary="Watch Hotpack for Not Owner")
async def hotpackInfo(uid: str):
    id = uid

    messageOwner = db["users"].find_one({"uid": id})

    try:
        hotpackInfo = {
            "hotpackName": messageOwner["hotpackName"],
            "temperature": messageOwner["temperature"],
            "count": messageOwner["count"]
        }

        return hotpackInfo
    except:
        return HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="잘못된 핫팩 ID입니다."
        )


@router.get("/all", summary="Watch Hotpack Messages for Owner")
async def allHotpackMessages(page: int, limit: int, current_user: User = Depends(get_current_user)):
    authUserEmail = current_user.email
    authUserID = current_user.uid

    user = await get_user_from_db(authUserEmail, authUserID)

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="유저가 존재하지 않습니다."
        )

    if user["temperature"] < 100:
        return {"success": False}

    messageIds = user["messages"]

    hasMore = len(messageIds) > page * limit
    # messageIds = user["messages"][(page-1)*limit:page*limit]

    # print(page, limit, len(messageIds))

    try:
        messages = db["messages"].find({"uid": {"$in": messageIds}}, {
            '_id': 0}).skip((page - 1)*limit).limit(limit)
        # messages = db["messages"].find({"uid":{"$in": messageIds}}, )

        ms = []

        for m in messages:
            ms.append(m)

        return {"success": True, "messages": ms, "hasMore": hasMore}
    except:
        return {"success": False}
