from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.core.database import Base


class Cita(Base):
    __tablename__ = "citas"

    id = Column(Integer, primary_key=True, index=True)
    cliente_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    agente_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    propiedad_id = Column(Integer, ForeignKey(
        "propiedades.id"), nullable=False)

    fecha_solicitada = Column(DateTime, nullable=False)
    fecha_propuesta = Column(DateTime)
    estado = Column(String(20), nullable=False)
    motivo_rechazo = Column(String(255))

    cliente = relationship("Usuario", foreign_keys=[cliente_id])
    agente = relationship("Usuario", foreign_keys=[agente_id])
    propiedad = relationship("Propiedad")
