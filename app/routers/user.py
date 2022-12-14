from fastapi import APIRouter, Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from uuid import uuid4

from ..utils import decode_jwt2user
from ..models import EditUserModel
from ..database import db
from ..dependencies import get_token_header
from ..auth_bearer import JWTBearer

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
    responses={404: {"description": "Not found"}},
)


@router.put('/edit', summary="Create new user", dependencies=[Depends(JWTBearer)])
async def create_user(editData: EditUserModel, request: Request):
    # querying database to check if user already exist
    authUser = request.state.user
    user = db["users"].find_one({"email": authUser.email})

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="유저가 존재하지 않습니다."
        )

    db["users"].update_one({"email": authUser.email}, {
                           "$set": {"username": editData.username}})

    return {"success": True}
