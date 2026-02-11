from pydantic import BaseModel, EmailStr
from typing import Optional


class UsuarioCreate(BaseModel):
    nombre_completo: str
    correo: EmailStr
    password: str


class UsuarioUpdate(BaseModel):
    nombre_completo: Optional[str] = None
    password: Optional[str] = None


class UsuarioResponse(BaseModel):
    id: int
    nombre_completo: str
    correo: EmailStr
    rol: str
    foto: Optional[str] = None

    class Config:
        from_attributes = True
