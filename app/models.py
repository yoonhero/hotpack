from pydantic import BaseModel, Field


class AuthModel(BaseModel):
    email: str
    password: str


class MessagePostModel(BaseModel):
    hotpackId: int
    writer: str
    message: str
    temperature: str = Field(default=0)


class EditUserModel(BaseModel):
    username: str
