from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from backend.models.user import User, UserCreate, UserOut
from backend.db_connect import SessionLocal
from datetime import timedelta
from backend.utils.hashing import hash_password
from backend.utils.hashing import verify_password
from backend.utils.token import create_access_token


# Tworzenie instancji routera
router = APIRouter()

# Zależność do uzyskania sesji bazy danych
def get_db():
    db = SessionLocal()  # Tworzymy sesję bazy danych
    try:
        yield db  # Zwracamy sesję do użycia w endpointach
    finally:
        db.close()  # Po zakończeniu zapytania sesja jest zamykana

# Funkcja do rejestracji użytkownika
@router.post("/register", response_model=UserOut)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    # Sprawdzamy, czy użytkownik już istnieje
    existing_user = db.query(User).filter(User.username == user.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already registered")

    # Hashowanie hasła
    hashed_password = hash_password(user.password)

    # Tworzymy użytkownika w bazie danych
    db_user = User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_password
    )
    
    # Dodanie użytkownika do sesji i zapisanie do bazy danych
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user  # Zwracamy stworzonego użytkownika

@router.post("/login",)
def login_user(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    """
    Funkcja obsługująca logowanie użytkownika.
    """
    # Pobieramy użytkownika z bazy danych
    user = db.query(User).filter(User.username == form_data.username).first()
    
    # Jeśli użytkownik nie istnieje lub hasło jest nieprawidłowe
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid username or password")
    
    # Generujemy token dostępu
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }

