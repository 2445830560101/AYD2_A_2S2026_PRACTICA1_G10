from sqlalchemy.orm import Session
from app.models.usuario import Usuario
from app.models.rol import Rol
from app.schemas.usuario_schema import UsuarioCreate
from app.core.security import hash_password
import shutil
import os
from fastapi import UploadFile  # Necesario para tipar la imagen

# Carpeta donde se guardarán las imágenes
UPLOAD_DIR = "imagenes"
os.makedirs(UPLOAD_DIR, exist_ok=True)


def registrar_cliente(db: Session, usuario: UsuarioCreate, foto: UploadFile = None):
    # Verificar si el correo ya existe
    existe = db.query(Usuario).filter(Usuario.correo == usuario.correo).first()
    if existe:
        raise ValueError("El correo ya está registrado")

    # Obtener rol CLIENTE
    rol_cliente = db.query(Rol).filter(Rol.nombre == "Cliente").first()
    if not rol_cliente:
        raise ValueError("No existe el rol CLIENTE")

    # Guardar la imagen si se envía
    ruta_foto = None
    if foto:
        ruta_foto = os.path.join(UPLOAD_DIR, foto.filename)
        with open(ruta_foto, "wb") as buffer:
            shutil.copyfileobj(foto.file, buffer)

    # Crear el usuario
    nuevo_usuario = Usuario(
        nombre_completo=usuario.nombre_completo,
        correo=usuario.correo,
        password=hash_password(usuario.password),
        rol_id=rol_cliente.id,
        foto=ruta_foto  # Guardas la ruta en la base de datos
    )

    db.add(nuevo_usuario)
    db.commit()
    db.refresh(nuevo_usuario)

    return nuevo_usuario
