import os
import shutil
import uuid
from fastapi import HTTPException, status, UploadFile
from sqlalchemy.orm import Session
from app.models.foto_propiedad import FotoPropiedad
from app.models.propiedad import Propiedad
from app.models.usuario import Usuario


UPLOAD_DIR = "imagenes/propiedades"
os.makedirs(UPLOAD_DIR, exist_ok=True)


def agregar_foto_propiedad(db: Session, propiedad_id: int, foto: UploadFile, usuario: Usuario):
    propiedad = db.query(Propiedad).filter(
        Propiedad.id == propiedad_id).first()
    if not propiedad:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Propiedad no encontrada"
        )
    # verificar que el usuario sea el agente de la propiedad
    if propiedad.agente_id != usuario.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No tienes permiso para agregar fotos a esta propiedad"
        )

    if foto.content_type not in ["image/jpeg", "image/png"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El archivo debe ser una imagen JPEG o PNG"
        )

    # Guardar la foto en el sistema de archivos
    extension = foto.filename.split(".")[-1]
    nombre_archivo = f"{propiedad_id}_{uuid.uuid4()}.{extension}"
    ruta = os.path.join(UPLOAD_DIR, nombre_archivo)
    with open(ruta, "wb") as buffer:
        shutil.copyfileobj(foto.file, buffer)

    # Guardar la información de la foto en la base de datos
    nueva_foto = FotoPropiedad(
        propiedad_id=propiedad_id,
        url=ruta
    )

    db.add(nueva_foto)
    db.commit()
    db.refresh(nueva_foto)

    return nueva_foto


def eliminar_foto_propiedad(db: Session, foto_id: int, usuario: Usuario):
    foto = db.query(FotoPropiedad).filter(FotoPropiedad.id == foto_id).first()

    if not foto:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Foto no encontrada"
        )

    propiedad = db.query(Propiedad).filter(
        Propiedad.id == foto.propiedad_id).first()

    # Verificar que el usuario sea el dueño de la propiedad
    if propiedad.agente_id != usuario.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No tienes permiso para eliminar esta foto"
        )

    # Eliminar archivo físico
    if os.path.exists(foto.url):
        os.remove(foto.url)

    # Eliminar registro de BD
    db.delete(foto)
    db.commit()

    return {"message": "Foto eliminada correctamente"}
