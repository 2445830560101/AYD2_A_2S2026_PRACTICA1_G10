from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List 
from app.core.dependencies import get_db, get_current_user
from app.models.usuario import Usuario
from app.schemas.cita_schema import CitaCreate, CitaPropuesta, CitaResponse

from app.services import cita_service
router = APIRouter(prefix="/citas", tags=["Citas"])


# Crear cita
@router.post("/", response_model=CitaResponse)
def crear_cita(cita: CitaCreate, db: Session = Depends(get_db), current_user: Usuario = Depends(get_current_user)):
    return cita_service.crear_cita(db, cita, current_user)

# Obtener solicitudes pendientes del agente
@router.get("/solicitudes", response_model=List[CitaResponse])
def obtener_solicitudes(db: Session = Depends(get_db), current_user: Usuario = Depends(get_current_user)):
    return cita_service.obtener_solicitudes(db, current_user)

# Obtener detalle cita
@router.get("/{cita_id}", response_model=CitaResponse)
def detalle_cita(cita_id: int, db: Session = Depends(get_db)):
    return cita_service.obtener_cita(db, cita_id)

# Proponer nueva fecha
@router.put("/{cita_id}/proponer", response_model=CitaResponse)
def proponer_fecha(cita_id: int, propuesta: CitaPropuesta, db: Session = Depends(get_db)):
    return cita_service.proponer_fecha(db, cita_id, propuesta)

# Ver motivo de rechazo
@router.get("/{cita_id}/motivo_rechazo")
def motivo_rechazo(cita_id: int, db: Session = Depends(get_db)):
    return cita_service.ver_motivo(db, cita_id)

# Agenda
@router.get("/agenda", response_model=List[CitaResponse])
def agenda_agente(db: Session = Depends(get_db), current_user: Usuario = Depends(get_current_user)):
    return cita_service.obtener_agenda(db, current_user.id)