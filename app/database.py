from pymongo import MongoClient
from .configs import MONGODB_URL, PORT


client = MongoClient(MONGODB_URL)
db = client["test"]
