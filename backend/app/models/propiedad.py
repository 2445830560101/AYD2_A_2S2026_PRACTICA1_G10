from sqlalchemy import Column, Integer, String, Numeric, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.core.database import Base  # <--- Esto faltaba


class Propiedad(Base):
    __tablename__ = "propiedades"

    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String(150), nullable=False)
    direccion = Column(String(255), nullable=False)
    precio = Column(Numeric(12, 2), nullable=False)
    descripcion = Column(Text)
    habitaciones = Column(Integer)
    banos = Column(Integer)
    metros_cuadrados = Column(Numeric(10, 2))

    agente_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    tipo_id = Column(Integer, ForeignKey("tipos_inmueble.id"), nullable=False)

    agente = relationship("Usuario", backref="propiedades")
    tipo = relationship("TipoInmueble", backref="propiedades")

    # 🔥 AGREGAR ESTO
    fotos = relationship(
        "FotoPropiedad",
        back_populates="propiedad",
        cascade="all, delete-orphan"
    )
