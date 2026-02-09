from sqlalchemy import Column, Integer, String
from core.database import Base


class TipoInmueble(Base):
    __tablename__ = "tipos_inmueble"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(50), nullable=False)
