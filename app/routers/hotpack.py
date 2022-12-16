from fastapi import APIRouter, Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from uuid import uuid4

from ..models import User
from ..auth_bearer import get_current_user
from ..utils import decode_jwt2user
from ..models import UpdateHotpackModel, GetHotpackModel
from ..database import db
from ..dependencies import get_token_header
from ..auth_bearer import JWTBearer

router = APIRouter(
    prefix="/hotpack",
    tags=["hotpack"],
    responses={404: {"description": "Not found"}},
)


@router.post('/name', summary="Make Own Hotpack")
async def updateHotpackName(editData: UpdateHotpackModel, current_user: User = Depends(get_current_user)):
    # querying database to check if user already exist
    authUserEmail = current_user.email
    authUserID = current_user._id

    user = db["users"].find_one({"email": authUserEmail, "_id": authUserID})

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="유저가 존재하지 않습니다."
        )

    db["users"].update_one({"email": authUserEmail}, {
                           "$set": {"hotpackName": editData.hotpackName, "temperature": 0, "messages": [], "count": 0}})

    return {"success": True}


@router.get("/", summary="Watch Hotpack for Not Owner")
async def hotpackInfo(data: GetHotpackModel):
    id = data["id"]

    messageOwner = db["users"].find_one({"_id": id})

    hotpackInfo = {
        "temperature": messageOwner["temperature"],
        "count": messageOwner["count"]
    }

    return hotpackInfo


@router.get("/all", summary="Watch Hotpack Messages for Owner", dependencies=[Depends(JWTBearer)])
async def allHotpackMessages(request: Request):
    authUser = request.state.user

    authUserEmail = authUser["email"]
    authUserID = authUser["_id"]

    user = db["users"].find_one({"email": authUserEmail, "_id": authUserID})

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="유저가 존재하지 않습니다."
        )

    return {"messages": user["messages"]}
