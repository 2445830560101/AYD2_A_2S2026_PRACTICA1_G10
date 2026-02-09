from sqlalchemy import Column, Integer, ForeignKey, UniqueConstraint
from core.database import Base


class Favorito(Base):
    __tablename__ = "favoritos"

    id = Column(Integer, primary_key=True, index=True)
    cliente_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    propiedad_id = Column(Integer, ForeignKey(
        "propiedades.id"), nullable=False)

    __table_args__ = (
        UniqueConstraint("cliente_id", "propiedad_id", name="unique_favorito"),
    )
