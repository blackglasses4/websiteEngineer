from fastapi import FastAPI
from backend.routers.auth import router
from backend.routers.files import files_router
from backend.routers.products import product_router
from backend.routers.order import order_router
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from config import FILES_DIR, STATIC_FILES_URL_BASE_PATH

app = FastAPI()

# Static files

app.mount(STATIC_FILES_URL_BASE_PATH, StaticFiles(directory=FILES_DIR), name="static")

# List of allowed origins (this should be the URL of your frontend)
origins = [
    "http://localhost:3000",  # React default local development port
    "https://your-frontend-domain.com",  # You can add your production URL here
]

# Include the router
app.include_router(router, tags=["Auth"])
app.include_router(files_router, tags=["Files"])
app.include_router(product_router, tags=["Products"])
app.include_router(order_router, tags=["Orders"])
# Add CORSMiddleware to the app to allow cross-origin requests

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # List of allowed origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)


@app.get("/")
def root():
    return {"message": "Welcome to backend API!"}
