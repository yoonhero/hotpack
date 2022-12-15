from fastapi import APIRouter, Depends, HTTPException, status
from uuid import uuid1

from ..models import AuthModel
from ..utils import get_hashed_password, encode_user2jwt, verify_password
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

    user_ = {
        'email': data.email,
        'password': get_hashed_password(data.password),
        '_id': str(uuid1().hex)
    }

    new_user = db["users"].insert_one(user_)

    to_jwt_user = {
        "email": user_["email"],
        "_id": user_["_id"]
    }

    return {"success": True, "jwt": encode_user2jwt(to_jwt_user)}


@router.post("/login", summary="Login")
async def login(data: AuthModel):
    user = db["users"].find_one({"email": data.email})

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="이메일을 확인해주세요."
        )

    status = verify_password(data.password, user.password)

    to_jwt_user = {
        "email": user["email"],
        "_id": user["_id"]
    }

    if not status:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="비밀번호를 확인해주세요."
        )

    return {"success": True, "jwt": encode_user2jwt(to_jwt_user)}
