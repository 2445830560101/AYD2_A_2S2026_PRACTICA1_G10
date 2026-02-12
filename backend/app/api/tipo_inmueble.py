from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from app.core.dependencies import get_db
from app.models.tipo_inmueble import TipoInmueble
from pydantic import BaseModel

router = APIRouter(prefix="/tipos-inmuebles", tags=["Tipos de Inmuebles"])

class TipoInmuebleCreate(BaseModel):
    nombre: str

class TipoInmuebleResponse(BaseModel):
    id: int
    nombre: str

    class Config:
        from_attributes = True

@router.get("/", response_model=list[TipoInmuebleResponse])
def listar_tipos_inmuebles(db: Session = Depends(get_db)):
    """Obtiene la lista de todos los tipos de inmuebles"""
    tipos = db.query(TipoInmueble).all()
    return tipos

@router.post("/", response_model=TipoInmuebleResponse, status_code=status.HTTP_201_CREATED)
def crear_tipo_inmueble(tipo_data: TipoInmuebleCreate, db: Session = Depends(get_db)):
    """Crea un nuevo tipo de inmueble"""
    
    # Verificar que no exista un tipo con el mismo nombre
    tipo_existente = db.query(TipoInmueble).filter(TipoInmueble.nombre.ilike(tipo_data.nombre)).first()
    if tipo_existente:
        raise HTTPException(status_code=400, detail="Este tipo de inmueble ya existe")
    
    nuevo_tipo = TipoInmueble(nombre=tipo_data.nombre)
    db.add(nuevo_tipo)
    db.commit()
    db.refresh(nuevo_tipo)
    return nuevo_tipo
