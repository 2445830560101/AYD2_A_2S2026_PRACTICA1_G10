from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.schemas.usuario_schema import UsuarioCreate, UsuarioUpdate, UsuarioResponse
from app.services.usuario_service import registrar_usuario, editar_usuario
from app.core.security import verify_token
from app.models.usuario import Usuario
from typing import List
from fastapi import Response, status

router = APIRouter(prefix="/usuarios", tags=["Usuarios"])


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
def registro_usuario(
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

        nuevo = registrar_usuario(db, usuario_data, foto)

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


@router.get("/", response_model=List[UsuarioResponse])
def obtener_usuarios(db: Session = Depends(get_db)):
    """Obtiene la lista de todos los usuarios registrados"""
    usuarios = db.query(Usuario).all()
    
    return [
        {
            "id": usuario.id,
            "nombre_completo": usuario.nombre_completo,
            "correo": usuario.correo,
            "rol": usuario.rol.nombre,
            "foto": usuario.foto
        }
        for usuario in usuarios
    ]


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
    usuario_id: int = Form(...),
    db: Session = Depends(get_db)
):
    # Creamos el objeto de actualización
    datos = UsuarioUpdate(
        nombre_completo=nombre_completo,
        password=password
    )

    try:
        actualizado = editar_usuario(db, usuario_id, datos, foto)
        return {
            "message": "Perfil actualizado correctamente",
            "usuario": {
                "id": actualizado.id,
                "nombre": actualizado.nombre_completo,
                "foto": actualizado.foto
                # No devolvemos el password por seguridad
            }
        }
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error interno: {str(e)}")
    
@router.delete("/delete/{usuario_id}", status_code=status.HTTP_204_NO_CONTENT)
def eliminar_usuario(
    usuario_id: int,
    db: Session = Depends(get_db)
):
    usuario = db.query(Usuario).filter(Usuario.id == usuario_id).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    db.delete(usuario)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)