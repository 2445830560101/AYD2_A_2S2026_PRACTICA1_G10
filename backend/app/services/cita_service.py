from sqlalchemy.orm import Session
from fastapi import HTTPException
from datetime import datetime
from app.models.cita import Cita
from app.models.propiedad import Propiedad
from app.schemas.cita_schema import CitaCreate, CitaPropuesta, CitaResponse

# Crear cita 
def crear_cita(db: Session, cita: CitaCreate, current_user):
    # verificar que el usuario sea cliente
    if current_user.rol.nombre.lower() != "cliente":
        raise HTTPException(status_code=403, detail="Solo los clientes pueden solicitar citas")
    
    # buscar propiedad
    propiedad = db.query(Propiedad).filter(Propiedad.id == cita.propiedad_id).first()
    if not propiedad:
        raise HTTPException(status_code=404, detail="Propiedad no encontrada")
    
    # Agente vinculado a la propiedad
    agente_id = propiedad.agente_id

    nueva_cita = Cita(
        cliente_id=current_user.id,
        agente_id=agente_id,
        propiedad_id=cita.propiedad_id,
        fecha_solicitada=cita.fecha_solicitada,
        estado="pendiente"
    )
    db.add(nueva_cita)
    db.commit()
    db.refresh(nueva_cita)
    return nueva_cita

# Obtener solicitudes pendientes del agente
def obtener_solicitudes(db: Session, current_user):
    if current_user.rol.nombre.lower() != "agente":
        raise HTTPException(status_code=403, detail="Solo los agentes pueden ver solicitudes")
    
    return db.query(Cita).filter(Cita.agente_id == current_user.id, Cita.estado == "pendiente").all()


# Obtener detalle cita
def obtener_cita(db: Session, cita_id: int):
    cita = db.query(Cita).filter(Cita.id == cita_id).first()
    if not cita:
        raise HTTPException(status_code=404, detail="Cita no encontrada")
    return cita

# Proponer nueva fecha
def proponer_fecha(db: Session, cita_id: int, propuesta: CitaPropuesta):
    cita = obtener_cita(db, cita_id)


    # validaciones
    conflicto = db.query(Cita).filter(
        Cita.agente_id == cita.agente_id,
        Cita.fecha_propuesta == propuesta.fecha_propuesta,
        Cita.estado == "confirmada"
    ).first()

    if conflicto:
        raise HTTPException(status_code=400, detail="Horario no disponible para el agente")
    
    if propuesta.fecha_propuesta < datetime.now():
        raise HTTPException(status_code=400, detail="Fecha invalida, debe ser futura")
    
    cita.fecha_propuesta = propuesta.fecha_propuesta
    cita.estado = "enviada"

    db.commit()
    db.refresh(cita)
    return cita

# Ver motivo de rechazo
def ver_motivo(db: Session, cita_id: int):
    cita = obtener_cita(db, cita_id)
    if cita.estado != "rechazada":
        raise HTTPException(status_code=400, detail="La cita no ha sido rechazada")
    return cita.motivo_rechazo


#Agenda del agente
def obtener_agenda(db: Session, agente_id: int):
    return db.query(Cita).filter(
        Cita.agente_id == agente_id, 
        Cita.estado.in_(["confirmada", "enviada"])
        ).all()