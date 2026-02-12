from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.core.security import verify_token
from app.models.usuario import Usuario
from app.schemas.usuario_schema import UsuarioResponse
from app.schemas.propiedad_schema import PropiedadResponse
from typing import List
from fastapi import status, Response
from app.models.favorito import Favorito
from app.models.propiedad import Propiedad

router = APIRouter(prefix="/clientes", tags=["Clientes"])

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

@router.get("/", response_model=List[UsuarioResponse])
def obtener_clientes(db: Session = Depends(get_db)):
    """Obtiene la lista de todos los clientes registrados"""
    usuarios = db.query(Usuario).filter(Usuario.rol.has(nombre="Cliente")).all()
    
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


@router.get("/favoritos", response_model=list[PropiedadResponse])
def listar_favoritos(
    db: Session = Depends(get_db),
    usuario: Usuario = Depends(get_current_user)
):
    """
    Obtiene la lista de propiedades marcadas como favoritas por el usuario.
    """
    
    # Consultar los favoritos del usuario
    favoritos = db.query(Favorito).filter(Favorito.cliente_id== usuario.id).all()
    
    # Obtener las propiedades asociadas a los favoritos
    propiedades_ids = [fav.propiedad_id for fav in favoritos]
    
    if not propiedades_ids:
        return []
    
    propiedades = db.query(Propiedad).filter(Propiedad.id.in_(propiedades_ids)).all()
    
    return [
        {
            "id": prop.id,
            "titulo": prop.titulo,
            "descripcion": prop.descripcion,
            "direccion": prop.direccion,
            "precio": prop.precio,
            "habitaciones": prop.habitaciones,
            "banos": prop.banos,
            "metros_cuadrados": prop.metros_cuadrados,
            "tipo_id": prop.tipo_id,
            "agente_id": prop.agente_id,
            "fotos": [foto.url for foto in prop.fotos] if prop.fotos else []
        }
        for prop in propiedades
    ]

@router.post("/favoritos/{propiedad_id}", status_code=status.HTTP_201_CREATED)
def agregar_favorito(
    propiedad_id: int,
    db: Session = Depends(get_db),
    usuario: Usuario = Depends(get_current_user)
):    
    # Verificar que la propiedad exista
    propiedad = db.query(Propiedad).filter(Propiedad.id == propiedad_id).first()
    if not propiedad:
        raise HTTPException(status_code=404, detail="Propiedad no encontrada")
    
    # Verificar si ya está en favoritos
    favorito_existente = db.query(Favorito).filter(
        Favorito.cliente_id== usuario.id,
        Favorito.propiedad_id == propiedad_id
    ).first()
    
    if favorito_existente:
        raise HTTPException(status_code=400, detail="Propiedad ya está en favoritos")
    
    nuevo_favorito = Favorito(cliente_id=usuario.id, propiedad_id=propiedad_id)
    db.add(nuevo_favorito)
    db.commit()
    
    return {"message": "Propiedad agregada a favoritos"}

@router.delete("/favoritos/{propiedad_id}", status_code=status.HTTP_204_NO_CONTENT)
def eliminar_favorito(
    propiedad_id: int,
    db: Session = Depends(get_db),
    usuario: Usuario = Depends(get_current_user)
):
    from app.models.favorito import Favorito
    
    favorito = db.query(Favorito).filter(
        Favorito.cliente_id== usuario.id,
        Favorito.propiedad_id == propiedad_id
    ).first()
    
    if not favorito:
        raise HTTPException(status_code=404, detail="Favorito no encontrado")
    
    db.delete(favorito)
    db.commit()
    
    return Response(status_code=status.HTTP_204_NO_CONTENT)