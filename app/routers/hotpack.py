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
    authUserEmail = current_user.get("email")
    authUserID = current_user.get("uid")

    user = db["users"].find_one({"email": authUserEmail, "uid": authUserID})

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="유저가 존재하지 않습니다."
        )

    db["users"].update_one({"email": authUserEmail}, {
                           "$set": {"hotpackName": editData.hotpackName, "temperature": 0, "messages": [], "count": 0}})

    return {"success": True}


@router.post("/write_message")
def write(data: MessagePostModel):
    score_response = score_api(data.message)
    s_keys = list(score_response.keys())
    s_values = list(score_response.values())
    temperature = int(s_keys[s_values.index(max(s_values))][0])

    createdAt = datetime.now()
    message_uid = str(uuid4().hex)

    message = Message(data.writer, data.message,
                      temperature, createdAt, message_uid)

    new_message = db["messages"].insert_one(message)

    db["user"].update_one({"uid": data.hotpackId}, {
                          '$push': {'messages': message_uid}}, upsert=True)

    return {"success": True, "temperature": temperature}


@router.get("/", summary="Watch Hotpack for Not Owner")
async def hotpackInfo(data: GetHotpackModel):
    id = data["uid"]

    messageOwner = db["users"].find_one({"uid": id})

    hotpackInfo = {
        "temperature": messageOwner["temperature"],
        "count": messageOwner["count"]
    }

    return hotpackInfo


@router.get("/all", summary="Watch Hotpack Messages for Owner")
async def allHotpackMessages(current_user: User = Depends(get_current_user)):
    authUserEmail = current_user.email
    authUserID = current_user.uid

    user = get_user_from_db(authUserEmail, authUserID)

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="유저가 존재하지 않습니다."
        )

    messageIds = user["messages"]

    messages = db["messages"].find({"uid": {"$in": messageIds}})

    return messages
