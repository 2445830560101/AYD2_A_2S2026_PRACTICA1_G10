from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_db, get_current_user
from app.models.usuario import Usuario
from app.schemas.propiedad_schema import PropiedadRegistro, PropiedadResponse, PropiedadUpdate
from app.services.propiedad_service import crear_propiedad, editar_propiedad, eliminar_propiedades, obtener_propiedades
from typing import Optional

router = APIRouter(prefix="/propiedades", tags=["Propiedades"])

@router.post("/registro_propiedad", response_model=PropiedadResponse, status_code=status.HTTP_201_CREATED)
def registro_propiedad(
    propiedad_data: PropiedadRegistro,
    db: Session = Depends(get_db),
    usuario: Usuario = Depends(get_current_user)
):
    nueva_propiedad = crear_propiedad(db, propiedad_data, usuario)
    return nueva_propiedad

@router.get("/mis_propiedades", response_model=list[PropiedadResponse])
def listar_mis_propiedades(
    tipo_id: Optional[int] = None,
    precio_min: Optional[float] = None,
    precio_max: Optional[float] = None,
    habitaciones: Optional[int] = None,
    banos: Optional[int] = None,
    db: Session = Depends(get_db),
    usuario: Usuario = Depends(get_current_user)
):
    return obtener_propiedades(db, usuario, tipo_id, precio_min, precio_max, habitaciones, banos)


@router.put("/{propiedad_id}", response_model=PropiedadResponse)
def actualizar_propiedad(
    propiedad_id: int,
    propiedad_data: PropiedadUpdate,
    db: Session = Depends(get_db),
    usuario: Usuario = Depends(get_current_user)
):
    return editar_propiedad(db, propiedad_id, propiedad_data, usuario)

@router.delete("/{propiedad_id}", status_code=status.HTTP_204_NO_CONTENT)
def eliminar_propiedad(
    propiedad_id: int,
    db: Session = Depends(get_db),
    usuario: Usuario = Depends(get_current_user)
):
    eliminar_propiedades(db, propiedad_id, usuario)
