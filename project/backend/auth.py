from fastapi import APIRouter, HTTPException
from .database import db
from .schemas import UserCreate, UserLogin

from passlib.context import CryptContext

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@router.post("/signup")
async def signup(user: UserCreate):
    existing = await db.users.find_one({"username": user.username})
    if existing:
        raise HTTPException(status_code=400, detail="Username already exists")
    
    hashed_pw = pwd_context.hash(user.password)
    user_dict = user.dict()
    user_dict["password"] = hashed_pw
    await db.users.insert_one(user_dict)
    return {"message": "User created successfully"}

@router.post("/login")
async def login(user: UserLogin):
    db_user = await db.users.find_one({"username": user.username})
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid username or password")
    
    if not pwd_context.verify(user.password, db_user["password"]):
        raise HTTPException(status_code=400, detail="Invalid username or password")
    
    return {"message": "Login successful"}
