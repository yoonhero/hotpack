from fastapi import FastAPI
from .routers import hotpack, message, auth


app = FastAPI()


app.include_router(auth.router)
app.include_router(message.router)
app.include_router(hotpack.router)


@app.get("/")
def hello():
    return "hello"
