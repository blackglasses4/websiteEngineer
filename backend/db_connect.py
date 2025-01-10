from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.exc import OperationalError
from dotenv import load_dotenv # Importowanie biblioteki do obsługi .env
import os # Moduł do pracy ze zmiennymi środowiskowymi
from .base import Base  # Import the shared Base
from .models.user import User  # Import models to ensure they are registered with Base
from .models.product import Product

# Ładowanie zmiennych z pliku .env
load_dotenv()

try:
    # Database configuration
    USERNAME = os.getenv("DATABASE_USERNAME")
    PASSWORD = os.getenv("DATABASE_PASSWORD")
    HOST = os.getenv("DATABASE_HOST")
    PORT = os.getenv("DATABASE_PORT")
    DATABASE = os.getenv("DATABASE_NAME")

    # Create a database engine
    SQLALCHEMY_DATABASE_URL = f"mysql+pymysql://{USERNAME}:{PASSWORD}@{HOST}:{PORT}/{DATABASE}"

    # Create the engine
    engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"charset": "utf8mb4"})
    
    # SessionLocal is a session factory
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    
    Base.metadata.create_all(bind=engine)
    
    print("Połączono z bazą danych")
except OperationalError as e:
    print("Błąd podczas połączenia z bazą danych:", e)
