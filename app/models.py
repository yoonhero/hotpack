from pydantic import BaseModel, Field
import datetime


class AuthModel(BaseModel):
    email: str
    password: str


class UpdateHotpackModel(BaseModel):
    hotpackName: str


class GetHotpackModel(BaseModel):
    id: str


class Token(BaseModel):
    access_token: str


class TokenData(BaseModel):
    email: str | None = None
    id: str | None = None


class User(BaseModel):
    email: str
    hotpackName: str | None = None
    id: str


class UserInDB(User):
    hashed_password: str


class MessagePostModel(BaseModel):
    hotpackId: int
    writer: str
    message: str
    temperature: str = Field(default=0)


class Message(BaseModel):
    writer: str
    message: str
    temperature: int
    createdAt: datetime.datetime
    id: str
