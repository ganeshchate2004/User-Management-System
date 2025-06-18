from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["userDB"]

auth_collection = db["authusers"]      # Email + Password only
users_collection = db["users"]         # Full profile with auth_id
