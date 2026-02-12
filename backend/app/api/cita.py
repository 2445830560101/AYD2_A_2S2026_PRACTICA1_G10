from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List 
from app.core.dependencies import get_db, get_current_user
from app.models.usuario import Usuario
from app.models.cita import Cita
from app.schemas.cita_schema import CitaCreate, CitaPropuesta, CitaResponse, CitaRechazo

from app.services import cita_service
router = APIRouter(prefix="/citas", tags=["Citas"])


# CLIENTE

# Obtener citas de cliente
@router.get("/mis-citas", response_model=List[CitaResponse])
def obtener_citas_cliente(db: Session = Depends(get_db), current_user: Usuario = Depends(get_current_user)):
    if current_user.rol.nombre.lower() != "cliente":
        raise HTTPException(status_code=403, detail="Solo los clientes pueden ver sus citas")
    
    return db.query(Cita).filter(Cita.cliente_id == current_user.id).all()

# Crear cita
@router.post("/", response_model=CitaResponse)
def crear_cita(cita: CitaCreate, db: Session = Depends(get_db), current_user: Usuario = Depends(get_current_user)):
    return cita_service.crear_cita(db, cita, current_user)

@router.put("/{cita_id}/aceptar", response_model=CitaResponse)
def aceptar_cita(cita_id: int, db: Session = Depends(get_db), current_user: Usuario = Depends(get_current_user)):
    return cita_service.aceptar_cita(db, cita_id, current_user)

@router.put("/{cita_id}/rechazar", response_model=CitaResponse)
def rechazar_cita(cita_id: int, rechazo: CitaRechazo, db: Session = Depends(get_db), current_user: Usuario = Depends(get_current_user)):
    return cita_service.cancelar_cita(db, cita_id, rechazo.motivo_rechazo, current_user)

# AGENTE

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