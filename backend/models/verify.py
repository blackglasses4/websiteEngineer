from pydantic import BaseModel

class VerifyResponse(BaseModel):
    message: str