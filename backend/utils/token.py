import jwt
from datetime import datetime, timedelta
from fastapi import HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer

# Sekretny klucz i algorytm (w produkcji używaj zmiennych środowiskowych!)
SECRET_KEY = "your_secret_key"  # Powinno być ustawione jako ENV w produkcji!
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

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
