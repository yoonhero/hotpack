import jwt
import hashlib
from .configs import SECRET_KEY


def get_hashed_password(password: str) -> str:
    return hashlib.sha256(password.encode("utf-8")).hexdigest()


def verify_password(password: str, hashed_pass: str) -> bool:
    return get_hashed_password(password) == hashed_pass


def encode_user2jwt(user):
    encoded_jwt_token = jwt.encode(user, SECRET_KEY, algorithm="HS256")

    return encoded_jwt_token


def decode_jwt2user(jwt_token):
    data = jwt.decode(jwt_token, SECRET_KEY, algorithms="HS256")

    return data
