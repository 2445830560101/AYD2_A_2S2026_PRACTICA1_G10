from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.schemas.usuario_schema import UsuarioCreate, UsuarioUpdate, UsuarioResponse
from app.services.usuario_service import registrar_usuario, editar_usuario
from app.core.security import verify_token
from app.models.usuario import Usuario

router = APIRouter(prefix="/agentes", tags=["Agentes"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_current_user(
    token: dict = Depends(verify_token),
    db: Session = Depends(get_db)
):
    user_id = int(token.get("sub"))
    usuario = db.query(Usuario).filter(Usuario.id == user_id).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return usuario


@router.post("/registro")
def registro_agente(
    nombre_completo: str = Form(...),
    correo: str = Form(...),
    password: str = Form(...),
    foto: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    try:
        usuario_data = UsuarioCreate(
            nombre_completo=nombre_completo,
            correo=correo,
            password=password
        )

        nuevo = registrar_usuario(db, usuario_data, foto, rol_nombre="Agente")

        return {
            "message": "Usuario registrado correctamente",
            "id": nuevo.id,
            "correo": nuevo.correo,
            "foto": nuevo.foto
        }

    except ValueError as e:
        raise HTTPException(
            status_code=409,
            detail=str(e)
        )


@router.get("/me", response_model=UsuarioResponse)
def obtener_mi_perfil(usuario: Usuario = Depends(get_current_user)):
    return {
        "id": usuario.id,
        "nombre_completo": usuario.nombre_completo,
        "correo": usuario.correo,
        "rol": usuario.rol.nombre,  # 👈 AQUÍ está la clave
        "foto": usuario.foto
    }


@router.post("/me")
def actualizar_mi_perfil(
    nombre_completo: str = Form(None),
    password: str = Form(None),
    foto: UploadFile = File(None),
    usuario: Usuario = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    datos = UsuarioUpdate(
        nombre_completo=nombre_completo,
        password=password
    )

    actualizado = editar_usuario(db, usuario.id, datos, foto)

    return {
        "message": "Perfil actualizado correctamente"
    }
