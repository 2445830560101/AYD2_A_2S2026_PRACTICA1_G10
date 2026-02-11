from pydantic import BaseModel
from typing import Optional
from datetime import datetime



class CitaCreate(BaseModel):
    propiedad_id: int
    fecha_solicitada: datetime
   
class CitaPropuesta(BaseModel):
    fecha_propuesta: datetime

class CitaResponse(BaseModel):
    id:int
    cliente_id: int
    agente_id: int
    propiedad_id: int
    fecha_solicitada: datetime
    fecha_propuesta: Optional[datetime] = None
    estado: str
    motivo_rechazo: Optional[str] = None

    class Config:
        from_attributes = True
