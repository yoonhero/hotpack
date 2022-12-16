from fastapi import FastAPI
from .routers import hotpack, auth


app = FastAPI()


app.include_router(auth.router)
app.include_router(hotpack.router)
