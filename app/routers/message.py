from fastapi import APIRouter, Depends, HTTPException, Request
import requests
import datetime

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
    temperature = sorted(score_response, key=lambda x: x.value())[0][0]
    data.temperature = temperature

    message = {
        "from": data.writer,
        "message": data.message,
        "temperature": temperature,
        "createdAt": datetime.datetime
    }

    new_message = db["messages"].insert_one(message)
    pass

    return


@router.get("/",  dependencies=[Depends(JWTBearer)])
def get_all_messages(request: Request):
    authUser = request.state.user
    target_user = db["users"].find_one({"message": authUser.email})

    return target_user.messages
