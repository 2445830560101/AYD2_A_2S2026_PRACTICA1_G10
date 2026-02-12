from sqlalchemy.orm import Session
from fastapi import UploadFile
from app.models.usuario import Usuario
from app.models.rol import Rol
from app.schemas.usuario_schema import UsuarioCreate, UsuarioUpdate
from app.core.security import hash_password
import os
import shutil
import uuid

UPLOAD_DIR = "imagenes"
os.makedirs(UPLOAD_DIR, exist_ok=True)


# REGISTRAR USUARIO
def registrar_usuario(
    db: Session,
    usuario: UsuarioCreate,
    foto: UploadFile | None = None,
    rol_nombre: str = "Cliente"
):
    # Validar correo único
    if db.query(Usuario).filter(Usuario.correo == usuario.correo).first():
        raise ValueError("El correo ya está registrado")

    # Obtener rol dinámicamente
    rol_obj = db.query(Rol).filter(Rol.nombre == rol_nombre).first()
    if not rol_obj:
        raise ValueError(f"No existe el rol {rol_nombre}")

    # Guardar foto (si existe)
    if foto:
        extension = os.path.splitext(foto.filename)[1]
        nombre_unico = f"{uuid.uuid4()}{extension}"
        ruta_fisica = os.path.join(UPLOAD_DIR, nombre_unico)

        with open(ruta_fisica, "wb") as buffer:
            shutil.copyfileobj(foto.file, buffer)
        
        ruta_relativa_db = f"{UPLOAD_DIR}/{nombre_unico}"

        ruta_foto = f"imagenes/{nombre_unico}"

    # Crear usuario
    nuevo = Usuario(
        nombre_completo=usuario.nombre_completo,
        correo=usuario.correo,
        password=hash_password(usuario.password),
        rol_id=rol_obj.id,
        foto=ruta_relativa_db if foto else None
    )

    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo


# EDITAR USUARIO
def editar_usuario(
    db: Session,
    usuario_id: int,
    datos: UsuarioUpdate,
    foto: UploadFile | None = None
):
    usuario = db.query(Usuario).filter(Usuario.id == usuario_id).first()
    if not usuario:
        raise ValueError("Usuario no encontrado")

    if datos.nombre_completo and datos.nombre_completo.strip():
        usuario.nombre_completo = datos.nombre_completo

    if datos.password and datos.password.strip():
        # Solo entramos aquí si el usuario escribió una contraseña nueva
        usuario.password = hash_password(datos.password)

    if foto:
        try:
            extension = os.path.splitext(foto.filename)[1]
            nombre_unico = f"{uuid.uuid4()}{extension}"

            ruta_fisica = os.path.join(UPLOAD_DIR, nombre_unico)
            with open(ruta_fisica, "wb") as buffer:
                shutil.copyfileobj(foto.file, buffer)

            usuario.foto = f"{UPLOAD_DIR}/{nombre_unico}"
        except Exception as e:
            print(f"Error al subir imagen: {e}")

    db.commit()
    db.refresh(usuario)
    return usuario

