from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_db, get_current_user
from app.models.usuario import Usuario
from app.schemas.propiedad_schema import PropiedadRegistro, PropiedadResponse
from app.services.propiedad_service import crear_propiedad


router = APIRouter(prefix="/propiedades", tags=["Propiedades"])

@router.post("/registro_propiedad", response_model=PropiedadResponse, status_code=status.HTTP_201_CREATED)
def registro_propiedad(
    propiedad_data: PropiedadRegistro,
    db: Session = Depends(get_db),
    usuario: Usuario = Depends(get_current_user)
):
    nueva_propiedad = crear_propiedad(db, propiedad_data, usuario)
    return nueva_propiedad