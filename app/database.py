from pymongo import MongoClient
from .configs import MONGODB_URL, PORT


print(MONGODB_URL)

client = MongoClient(MONGODB_URL)
db = client.production


async def get_user_from_db(email, uid):
    return db["users"].find_one({"email": email, "uid": uid})
