import os
from dotenv import load_dotenv

load_dotenv()

HUGGING_FACE_AUTH = os.getenv("HUGGING_FACE_AUTH")
MONGODB_URL = os.getenv("MONGODB_URL")

PORT = 8000

SECRET_KEY = os.getenv("SECRET_KEY")

