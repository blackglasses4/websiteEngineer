from fastapi import APIRouter
from sqlalchemy.orm import Session
from backend.db_connect import SessionLocal

#Tworzenie instancji routera
order_router = APIRouter()

# Zależność do uzyskania sesji bazy danych
def get_db():
    db = SessionLocal()  # Tworzymy sesję bazy danych
    try:
        yield db  # Zwracamy sesję do użycia w endpointach
    finally:
        db.close()  # Po zakończeniu zapytania sesja jest zamykana
        
