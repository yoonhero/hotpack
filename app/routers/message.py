from fastapi import APIRouter, Depends, HTTPException, Request
import requests
from datetime import datetime
from uuid import uuid4

from ..configs import HUGGING_FACE_AUTH
from ..dependencies import get_token_header
from ..models import MessagePostModel
from ..database import db
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

    message = {
        "from": data.writer,
        "message": data.message,
        "temperature": temperature,
        "createdAt": datetime.now(),
        "_id": str(uuid4().hex)
    }

    new_message = db["messages"].insert_one(message)

    return {"success": True}


@router.get("/",  dependencies=[Depends(JWTBearer)])
def get_all_messages(request: Request):
    authUser = request.state.user
    target_user = db["users"].find_one({"message": authUser.email})

    return target_user.messages
