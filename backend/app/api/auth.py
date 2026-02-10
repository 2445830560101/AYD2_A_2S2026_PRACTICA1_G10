from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import db
from app.schemas.auth_schema import LoginRequest, LoginResponse
from app.services.auth_service import login_usuario

router = APIRouter(prefix="/auth", tags=["Auth"])


def get_db():
    session = db.SessionLocal()
    try:
        yield session
    finally:
        session.close()


@router.post("/login", response_model=LoginResponse)
def login(data: LoginRequest, db: Session = Depends(get_db)):
    resultado = login_usuario(db, data.correo, data.password)
    if not resultado:
        raise HTTPException(status_code=401, detail="Credenciales inválidas")
    return resultado
