from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import db
from app.schemas.auth_schema import LoginRequest, LoginResponse
from app.services.auth_service import login_usuario
from app.core.security import crear_access_token

router = APIRouter(prefix="/auth", tags=["Auth"])


def get_db():
    session = db.SessionLocal()
    try:
        yield session
    finally:
        session.close()


@router.post("/login", response_model=LoginResponse)
def login(data: LoginRequest, db: Session = Depends(get_db)):
    usuario = login_usuario(db, data.correo, data.password)
    if not usuario:
        raise HTTPException(status_code=401, detail="Credenciales inválidas")

    token = crear_access_token({
        "sub": str(usuario.id),
        "rol": usuario.rol.nombre
    })

    return {
        "access_token": token,
        "token_type": "bearer",
        "id": usuario.id,
        "correo": usuario.correo,
        "rol": usuario.rol.nombre
    }
