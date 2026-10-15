from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field
from models import Users, Books, Reservations
from fastapi.responses import JSONResponse
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from typing import Annotated, Optional
from database import SessionLocal
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from jose import jwt, JWTError
from router.auth import get_current_user

router = APIRouter()

class BookCreate(BaseModel):
    title: str
    author: str
    category: str
    description: str = Field(default = '', max_length=300)
    price: float = Field(default = 0.0, ge=0)
    total_copies: int = Field(default = 1)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(get_current_user)]


@router.post('/admin/create_book')
def create_book(user: user_dependency, db: db_dependency, new_book: BookCreate):
    
    if user is None or user.get('role') != 'librarian':
        raise HTTPException(status_code=401, detail='Failed Authentication')
    
    book_model = Books(
        **new_book.model_dump(),
        available_copies = new_book.total_copies
    )
    
    db.add(book_model)
    db.commit()
    
    return JSONResponse(status_code=201, content={'message': 'Book added successfully'})