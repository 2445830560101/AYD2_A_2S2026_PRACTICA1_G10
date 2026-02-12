from pydantic import BaseModel, EmailStr


class LoginRequest(BaseModel):
    correo: EmailStr
    password: str


class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    id: int
    correo: EmailStr
    rol: str
    foto: str | None
    nombre_completo: str
