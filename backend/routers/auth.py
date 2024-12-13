from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.models.user import User, UserCreate, UserOut
from backend.db_connect import SessionLocal
from backend.utils.hashing import hash_password

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

@router.post("/login", response_model=UserOut)
def login_user(user: UserCreate, db: Session = Depends(get_db)):
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

