from fastapi import APIRouter, Depends, HTTPException, Query
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from backend.models.user import User, UserCreate, UserOut
from backend.db_connect import SessionLocal
from datetime import timedelta
from backend.utils.hashing import hash_password
from backend.utils.hashing import verify_password
from backend.utils.token import create_access_token
from sqlalchemy.sql import or_


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
        first_name = user.first_name,
        last_name= user.last_name,
        username=user.username,
        email=user.email,
        hashed_password=hashed_password,
        is_admin = user.is_admin
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
    print("Received data:", form_data.username, form_data.password)  # Loguj dane
    # Pobieramy użytkownika z bazy danych
    user = db.query(User).filter(
        or_(
            User.username == form_data.username,
            User.email == form_data.username
        )
    ).first()
    
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
        "token_type": "bearer",
        "username": user.username,
        "is_admin": user.is_admin
    }

@router.get("/users")
def get_users(
    page:int = Query(1,ge=1),
    per_page: int = Query(8,ge=1),
    db: Session = Depends(get_db)
    ):
    
    query = db.query(User)
    
    total_users = query.count()
    
    query = query.offset((page - 1)* per_page).limit(per_page)
    users = query.all()  # Query all products from the database
    
    total_pages = (total_users + per_page - 1) // per_page
    
    if not users:
        raise HTTPException(status_code=404, detail="No users found")
    return {
        "data": users,
        "first": 1,
        "prev": page - 1 if page > 1 else None,
        "next": page + 1 if page < total_pages else None,
        "last": total_pages,
        "pages": total_pages,
        "users": total_users,
    }

@router.post("/user", response_model=UserOut)
def add_user(user: UserCreate, db: Session = Depends(get_db)):
    # Sprawdzamy, czy użytkownik już istnieje
    existing_user = db.query(User).filter(User.username == user.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already registered")

    # Hashowanie hasła
    hashed_password = hash_password(user.password)

    # Tworzymy użytkownika w bazie danych
    db_user = User(
        first_name = user.first_name,
        last_name= user.last_name,
        username=user.username,
        email=user.email,
        hashed_password=hashed_password,
        is_admin = user.is_admin
    )
    
    # Dodanie użytkownika do sesji i zapisanie do bazy danych
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user  # Zwracamy stworzonego użytkownika

@router.put("/user/{id}", response_model=UserOut)
def edit_user(id: int, user: UserCreate, db: Session = Depends(get_db)):
    # Find the user in the database by ID
    db_user = db.query(User).filter(User.id == id).first()
    
    # If the user does not exist, raise an error
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # If a new username is provided, check if it is already taken
    if user.username != db_user.username:
        existing_user = db.query(User).filter(User.username == user.username).first()
        if existing_user:
            raise HTTPException(status_code=400, detail="Username already registered")
    
    # Update the user fields, only change those that are provided in the request
    db_user.first_name = user.first_name
    db_user.last_name = user.last_name
    db_user.email = user.email
    db_user.is_admin = user.is_admin
    
    # Update the password if it was provided
    if user.password:
        db_user.hashed_password = hash_password(user.password)
    
    # Commit the changes to the database
    db.commit()
    db.refresh(db_user)
    
    # Return the updated user object
    return db_user

@router.delete("/user/{id}")
def delete_user(id: int, db: Session = Depends(get_db)):
    
    # Query the user by ID
    user = db.query(User).filter(User.id == id).first()
    
    # If the user does not exist, raise a 404 error
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Delete the user from the database
    db.delete(user)
    db.commit()

    # Return a success message
    return {"message": f"User with ID {id} has been deleted successfully."}