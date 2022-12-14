from fastapi import Header, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer
from typing import Union, Any
from datetime import datetime

from .utils import decode_jwt2user


async def get_token_header(x_token: str = Header()):
    try:
        user = decode_jwt2user(x_token)
    except:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Could not find user",
        )

    return user
