from fastapi import Request, HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from .models import TokenData
from .database import get_user_from_db
from .utils import decode_jwt2user

# def get_current_user(token: str = Depends(oauth2_scheme)):
#     credentials_exception = HTTPException(
#         status_code=status.HTTP_401_UNAUTHORIZED,
#         detail="Could not validate credentials"
#     )
#     try:
#         payload = decode_jwt2user(token)
#         email: str = payload.get("email")
#         if email is None:
#             raise credentials_exception
#     except:
#         raise credentials_exception
#     else:
#         user = db["users"].find_one({"email": payload.email})
#         if user is None:
#             raise credentials_exception
#         return user


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:

        payload = decode_jwt2user(token)
        email: str = payload.get("email")

        if email is None:
            raise credentials_exception

        token_data = TokenData(**payload)

    except jwt.DecodeError:
        raise credentials_exception

    print(token_data)

    user = await get_user_from_db(token_data.email, token_data._id)

    if user is None:
        raise credentials_exception

    return user


class JWTBearer(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super(JWTBearer, self).__init__(auto_error=auto_error)

    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super(JWTBearer, self).__call__(request)
        if credentials:
            if not credentials.scheme == "Bearer":
                raise HTTPException(
                    status_code=403, detail="Invalid authentication scheme.")
            if not self.verify_jwt(credentials.credentials):
                raise HTTPException(
                    status_code=403, detail="Invalid token or expired token.")
            return credentials.credentials
        else:
            raise HTTPException(
                status_code=403, detail="Invalid authorization code.")

    def verify_jwt(self, jwtoken: str) -> bool:
        isTokenValid: bool = False

        try:
            payload = decode_jwt2user(jwtoken)
        except:
            payload = None
        if payload:
            isTokenValid = True
        return payload
