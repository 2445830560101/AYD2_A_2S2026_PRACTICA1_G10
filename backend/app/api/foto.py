from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.core.database import db
from app.core.dependencies import get_db, get_current_user
from app.models.usuario import Usuario
from app.services.foto_propiedad_service import agregar_foto_propiedad


router = APIRouter(prefix="/propiedades", tags=["propiedades"])

@router.post("/{propiedad_id}/fotos")
def subir_foto_propiedad(
    propiedad_id: int,
    foto: UploadFile = File(...),
    db: Session = Depends(get_db),
    usuario: Usuario = Depends(get_current_user)
):
    return agregar_foto_propiedad(db, propiedad_id, foto, usuario)


