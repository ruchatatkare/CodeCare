import os
from dotenv import load_dotenv
import motor.motor_asyncio

load_dotenv()  # Make sure this runs

MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME")

if not MONGO_URI or not DB_NAME:
    raise ValueError(f"Environment variables not loaded. MONGO_URI={MONGO_URI}, DB_NAME={DB_NAME}")

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URI)
db = client[DB_NAME]
