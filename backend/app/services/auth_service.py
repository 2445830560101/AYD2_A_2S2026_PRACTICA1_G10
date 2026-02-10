from sqlalchemy.orm import Session
from app.models.usuario import Usuario
from app.core.security import verify_password, crear_access_token


def login_usuario(db: Session, correo: str, password: str):
    # Buscar usuario por correo
    usuario = db.query(Usuario).filter(Usuario.correo == correo).first()
    if not usuario:
        return None  # Usuario no existe

    # Verificar contraseña
    if not verify_password(password, usuario.password):
        return None  # Contraseña incorrecta

    # Crear token JWT
    token_data = {
        "sub": str(usuario.id),  # user_id
        "rol": usuario.rol.nombre
    }
    access_token = crear_access_token(token_data)

    # Devolver usuario + token
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "id": usuario.id,
        "correo": usuario.correo,
        "rol": usuario.rol.nombre
    }
