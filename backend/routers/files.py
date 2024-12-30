import aiofiles
from fastapi import APIRouter, UploadFile
from config import FILES_DIR, STATIC_FILES_URL_BASE_PATH

files_router = APIRouter()

@files_router.post("/files/")
async def upload_file(file: UploadFile):
    "Upload file using multipart/form-data content type"
    output_filepath = f"{FILES_DIR}/{file.filename}"

    async with aiofiles.open(output_filepath, "wb") as output_file:
        while content := await file.read(1024):     # \ asynchronous reading and saving piece by piece
            await output_file.write(content)        # / so as not to charge the entire file to the memory

    return {"filepath": f"{STATIC_FILES_URL_BASE_PATH}/{file.filename}"}    # return path to uploaded file
