from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.core.database import db
from app.core.dependencies import get_db, get_current_user
from app.models.usuario import Usuario
from app.services.foto_propiedad_service import agregar_foto_propiedad
from app.models.propiedad import Propiedad
from typing import List


router = APIRouter(prefix="/propiedades", tags=["propiedades"])


@router.post("/{propiedad_id}/fotos")
def subir_foto_propiedad(
    propiedad_id: int,
    foto: UploadFile = File(...),
    db: Session = Depends(get_db),
    usuario: Usuario = Depends(get_current_user)
):
    return agregar_foto_propiedad(db, propiedad_id, foto, usuario)


@router.get("/{propiedad_id}/fotos", response_model=List[str])
def obtener_fotos_propiedad(
    propiedad_id: int,
    db: Session = Depends(get_db)
):
    propiedad = db.query(Propiedad).filter(
        Propiedad.id == propiedad_id).first()
    if not propiedad:
        raise HTTPException(status_code=404, detail="Propiedad no encontrada")

    fotos = [foto.url for foto in propiedad.fotos] if hasattr(
        propiedad, "fotos") else []

    return fotos
