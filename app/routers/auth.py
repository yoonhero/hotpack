from datetime import datetime, timedelta
import jwt
from fastapi import APIRouter, Depends, HTTPException, status
from uuid import uuid4
from pydantic import BaseModel

from ..configs import SECRET_KEY
from ..auth_bearer import get_current_user
from ..models import AuthModel, TokenData, User, UserInDB
from ..utils import get_hashed_password, encode_user2jwt, verify_password, decode_jwt2user
from ..database import db

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
    responses={404: {"description": "Not found"}},
)


@router.post('/signup', summary="Create new user")
async def create_user(data: AuthModel):
    # querying database to check if user already exist
    user = db["users"].find_one({"email": data.email})

    if user is not None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="이미 이 이메일 주소로 계정이 있습니다. 다시 한번 확인해주세요."
        )

    hashed_password = get_hashed_password(data.password)
    user_uid = uuid4().hex

    user_ = UserInDB(email=data.email, uid=user_uid,
                     hashed_password=hashed_password)

    new_user = db["users"].insert_one(user_.dict())

    to_jwt_user = TokenData(**user_.dict())

    return {"success": True, "jwt": encode_user2jwt(to_jwt_user.dict()), "uid": user_uid}


@router.post("/login", summary="Login")
async def login(data: AuthModel):
    user = db["users"].find_one({"email": data.email})

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="이메일을 확인해주세요."
        )

    status_ = verify_password(data.password, user["hashed_password"])

    to_jwt_user = TokenData(**user)

    if not status_:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="비밀번호를 확인해주세요."
        )

    return {"success": True, "jwt": encode_user2jwt(to_jwt_user.dict()), "uid": user["uid"]}


@router.post("/me", summary="ME")
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user
