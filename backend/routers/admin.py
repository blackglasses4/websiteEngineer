from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.utils.token import admin_required, get_current_user  # import funkcji sprawdzającej uprawnienia
from backend.db_connect import SessionLocal
from backend.models.user import User

router = APIRouter()

# Zależność do uzyskania sesji bazy danych
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Endpoint dostępny tylko dla adminów
@router.get("/admin/")
def get_admin_dashboard(current_user: dict = Depends(admin_required), db: Session = Depends(get_db)):
    """
    Endpoint dostępny tylko dla administratorów. Zwraca dane admina lub dostęp do panelu administracyjnego.
    """
    return {
        "message": "Welcome to the admin dashboard",
        "user": current_user  # Zwracamy dane użytkownika, który jest administratorem
    }
