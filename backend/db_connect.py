from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.exc import OperationalError
from .base import Base  # Import the shared Base
from .models.user import User  # Import models to ensure they are registered with Base
from .models.product import Product

try:
    # Database configuration
    USERNAME = 'mikihoff'
    PASSWORD = '1234'
    HOST = 'localhost'
    PORT = '3306'
    DATABASE = 'sklep'

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
