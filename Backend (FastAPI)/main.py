from fastapi import FastAPI, Depends, HTTPException, Query
from typing import Annotated, Optional
from sqlalchemy.orm import Session
from pydantic import BaseModel, Field
import models
from models import Users, Books
from database import engine, SessionLocal
from fastapi.responses import JSONResponse
from router import admin, auth
from router.auth import get_current_user

app = FastAPI()

models.Base.metadata.create_all(bind=engine)
app.include_router(auth.router)
# app.include_router(admin.router)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(get_current_user)]


@app.get('/books/all')
def get_all_books(user: user_dependency, db: db_dependency):
    
    if user is None:
        raise HTTPException(status_code=401, detail='Failed Authentication')
    
    books = db.query(Books).all()
    return books


@app.get('/books/{book_id}')
def get_all_books(user: user_dependency, db: db_dependency, book_id: int):
    
    if user is None:
        raise HTTPException(status_code=401, detail='Failed Authentication')
    
    book = db.query(Books).filter(Books.id == book_id).first()
    
    if book is None:
        raise HTTPException(status_code=404, detail='Book not found')
    return book


@app.get('/user_profile')
def get_user_profile(user : user_dependency, db : db_dependency):

    if user is None:
        raise HTTPException(status_code=401, detail="User didnot loged in yet!!!")
    
    return db.query(Users).filter(Users.id == user.get('id')).first()