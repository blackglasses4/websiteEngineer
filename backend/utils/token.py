import jwt
from datetime import datetime, timedelta
from fastapi import HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from dotenv import load_dotenv
import os

# Ładowanie zmiennych z pliku .env
load_dotenv()

# Sekretny klucz i algorytm (w produkcji używaj zmiennych środowiskowych!)
SECRET_KEY = os.getenv("SECRET_KEY")  # Powinno być ustawione jako ENV w produkcji!
ALGORITHM = os.getenv("JWT_ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES")

# OAuth2PasswordBearer - punkt końcowy do logowania (potrzebny do zabezpieczonych endpointów)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# Funkcja generowania tokenu JWT
def create_access_token(data: dict, expires_delta: timedelta | None = None):
    """
    Tworzy token JWT z danymi użytkownika i czasem wygaśnięcia.
    """
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})  # Dodajemy datę wygaśnięcia do payloadu
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Funkcja weryfikacji tokenu JWT
def verify_access_token(token: str):
    """
    Weryfikuje token JWT i zwraca dane użytkownika, jeśli token jest poprawny.
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")  # Pobieramy nazwę użytkownika (sub)
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return payload  # Zwracamy dane z tokenu
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

# Funkcja do zabezpieczonych endpointów
def get_current_user(token: str = Depends(oauth2_scheme)):
    """
    Pobiera aktualnego użytkownika na podstawie tokenu JWT.
    """
    return verify_access_token(token)

# Funkcja do wymuszenia dostępu administracyjnego
def admin_required(current_user: dict = Depends(get_current_user)):
    """
    Wymaga, aby aktualny użytkownik był administratorem.
    """
    if not current_user.get("is_admin"):
        raise HTTPException(status_code=403, detail="Admin access required")
    return current_user