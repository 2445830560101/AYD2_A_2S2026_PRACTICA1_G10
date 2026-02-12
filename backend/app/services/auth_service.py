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

    return usuario
