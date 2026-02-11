from pydantic import BaseModel
from typing import Optional
class PropiedadRegistro(BaseModel):
    titulo: str
    direccion: str
    precio: float
    descripcion: Optional[str] = None
    habitaciones: Optional[int] = None
    banos: Optional[int] = None
    metros_cuadrados: Optional[float] = None
    tipo_id: int

class PropiedadResponse(BaseModel):
    id: int
    titulo: str
    direccion: str
    precio: float
    descripcion: Optional[str] = None
    habitaciones: Optional[int] = None
    banos: Optional[int] = None
    metros_cuadrados: Optional[float] = None
    agente_id: int
    tipo_id: int

    class Config:
        from_attributes = True