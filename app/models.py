from pydantic import BaseModel, Field
import datetime


class AuthModel(BaseModel):
    email: str
    password: str


class UpdateHotpackModel(BaseModel):
    hotpackName: str


class GetHotpackModel(BaseModel):
    uid: str


class Token(BaseModel):
    access_token: str


class TokenData(BaseModel):
    email: str = None
    uid: str = None


class User(BaseModel):
    email: str
    hotpackName: str = None
    uid: str


class UserInDB(User):
    hashed_password: str


class MessagePostModel(BaseModel):
    hotpackId: str
    writer: str
    message: str


class Message(BaseModel):
    writer: str
    message: str
    temperature: int
    createdAt: datetime.datetime
    uid: str
