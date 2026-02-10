from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.core.database import db
from app.schemas.usuario_schema import UsuarioCreate
from app.services.usuario_service import registrar_cliente

router = APIRouter(prefix="/usuarios", tags=["Usuarios"])


def get_db():
    session = db.SessionLocal()
    try:
        yield session
    finally:
        session.close()


@router.post("/registro")
def registro_cliente(
    nombre_completo: str = Form(...),
    correo: str = Form(...),
    password: str = Form(...),
    foto: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    try:
        # Creamos el objeto UsuarioCreate con los datos del formulario
        usuario_data = UsuarioCreate(
            nombre_completo=nombre_completo,
            correo=correo,
            password=password
        )

        # Llamamos al servicio, pasándole la imagen también
        nuevo = registrar_cliente(db, usuario_data, foto)

        return {
            "message": "Usuario registrado correctamente",
            "id": nuevo.id,
            "correo": nuevo.correo,
            "foto": nuevo.foto  # ruta donde se guardó la imagen
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
