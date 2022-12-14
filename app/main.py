from fastapi import FastAPI
from .routers import message, user, auth


app = FastAPI()


app.include_router(auth.router)
app.include_router(message.router)
app.include_router(user.router)


@app.get("/")
def hello():
    return "hello"
