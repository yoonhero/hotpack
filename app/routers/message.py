from fastapi import APIRouter, Depends, HTTPException, Request
import requests
from datetime import datetime
from uuid import uuid4

from ..models import AuthModel, TokenData, User, Message
from ..auth_bearer import get_current_user
from ..configs import HUGGING_FACE_AUTH
from ..dependencies import get_token_header
from ..models import MessagePostModel
from ..database import db, get_user_from_db
from ..auth_bearer import JWTBearer


def score_api(payload):
    API_URL = "https://api-inference.huggingface.co/models/nlptown/bert-base-multilingual-uncased-sentiment"
    headers = {"Authorization": f"Bearer {HUGGING_FACE_AUTH}"}
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()


router = APIRouter(
    prefix="/message",
    tags=["message"],
    responses={404: {"description": "Not found"}},
)


@router.post("/write")
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

    db["user"].update_one({"_id":data.hotpackId}, {'$push': {'messages': message_uid}}, upsert = True)

    return {"success": True, "temperature": temperature}


@router.get("/")
def get_all_messages(current_user: User = Depends(get_current_user)):
    target_user = get_user_from_db(current_user.email, current_user._id)

    messageIds = target_user["messages"]

    messages = db["messages"].find({"_id":{"$in": messageIds}})

    return messages
