from pymongo import MongoClient
from .configs import MONGODB_URL, PORT


print(MONGODB_URL)

client = MongoClient(MONGODB_URL)
db = client.test


async def get_user_from_db(email, _id):
    return db["users"].find_one({"email": email, "_id": _id})
