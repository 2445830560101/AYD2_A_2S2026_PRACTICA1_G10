from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base


class FotoPropiedad(Base):
    __tablename__ = "fotos_propiedad"

    id = Column(Integer, primary_key=True, index=True)
    propiedad_id = Column(
        Integer,
        ForeignKey("propiedades.id", ondelete="CASCADE"),
        nullable=False
    )

    url = Column(String(255), nullable=False)

    propiedad = relationship(
        "Propiedad",
        back_populates="fotos"
    )
