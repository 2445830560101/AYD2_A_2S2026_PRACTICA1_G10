from pydantic import BaseModel, EmailStr
from typing import Optional


class UsuarioCreate(BaseModel):
    nombre_completo: str
    correo: EmailStr
    password: str
    foto: Optional[str] = None


class UsuarioResponse(BaseModel):
    id: int
    nombre_completo: str
    correo: EmailStr
    rol: str

    class Config:
        from_attributes = True
