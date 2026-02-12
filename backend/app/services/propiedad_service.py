from typing import Optional
from sqlalchemy import desc
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models.propiedad import Propiedad
from app.models.usuario import Usuario
from app.models.tipo_inmueble import TipoInmueble
from app.schemas.propiedad_schema import PropiedadRegistro, PropiedadUpdate
from sqlalchemy import or_


def crear_propiedad(db: Session, propiedad_data: PropiedadRegistro, usuario: Usuario) -> Propiedad:
    # Verificar que el agente tenga el rol adecuado
    if usuario.rol.nombre.lower() != "agente":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Solo los agentes pueden crear propiedades"
        )

    # Validar tipo de inmueble
    tipo = db.query(TipoInmueble).filter(
        TipoInmueble.id == propiedad_data.tipo_id).first()
    if not tipo:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Tipo de inmueble no válido"
        )

    # Validaciones
    if tipo.nombre.lower() == "casa" and (propiedad_data.habitaciones is None or propiedad_data.banos is None):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Las casas deben tener número de habitaciones y baños"
        )
    if propiedad_data.precio <= 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El precio debe ser un valor positivo"
        )

    if tipo.nombre.lower() == "terreno":
        if propiedad_data.habitaciones is not None or propiedad_data.banos is not None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Los terrenos no deben tener habitaciones ni baños"
            )

    # Crear la propiedad
    nueva_propiedad = Propiedad(
        titulo=propiedad_data.titulo,
        direccion=propiedad_data.direccion,
        precio=propiedad_data.precio,
        descripcion=propiedad_data.descripcion,
        habitaciones=propiedad_data.habitaciones,
        banos=propiedad_data.banos,
        metros_cuadrados=propiedad_data.metros_cuadrados,
        agente_id=usuario.id,
        tipo_id=propiedad_data.tipo_id
    )

    # Guardar en la base de datos
    db.add(nueva_propiedad)
    db.commit()
    db.refresh(nueva_propiedad)
    return nueva_propiedad


def editar_propiedad(db: Session, propiedad_id: int, propiedad_data: PropiedadUpdate, usuario: Usuario) -> Propiedad:
    propiedad = db.query(Propiedad).filter(
        Propiedad.id == propiedad_id).first()
    if not propiedad:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Propiedad no encontrada"
        )

    # Verificar que el usuario sea el agente de la propiedad
    if propiedad.agente_id != usuario.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No tienes permiso para editar esta propiedad"
        )

    # validadciones
    if propiedad_data.precio is not None and propiedad_data.precio <= 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El precio debe ser un valor positivo"
        )

    # aplicar solo campos enviados
    for campo, valor in propiedad_data.model_dump(exclude_unset=True).items():
        setattr(propiedad, campo, valor)

    # Guardar cambios en la base de datos
    db.commit()
    db.refresh(propiedad)
    return propiedad


def eliminar_propiedades(db: Session, propiedad_id: int, usuario: Usuario) -> None:
    propiedad = db.query(Propiedad).filter(
        Propiedad.id == propiedad_id).first()
    if not propiedad:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Propiedad no encontrada"
        )

    # Verificar que el usuario sea el agente de la propiedad
    if propiedad.agente_id != usuario.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No tienes permiso para eliminar esta propiedad"
        )

    db.delete(propiedad)
    db.commit()


def obtener_propiedades(
    db: Session,
    tipo_id: Optional[int] = None,
    precio_min: Optional[float] = None,
    precio_max: Optional[float] = None,
    habitaciones: Optional[int] = None,
    banos: Optional[int] = None
):

    query = db.query(Propiedad)
    # Validar rango de precios
    if precio_min is not None and precio_max is not None:
        if precio_min > precio_max:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="El precio mínimo no puede ser mayor que el precio máximo"
            )
    # Aplicar filtros
    # filtrar por tipo de inmueble
    if tipo_id is not None:
        query = query.filter(Propiedad.tipo_id == tipo_id)
    # filtrar por precio mínimo
    if precio_min is not None:
        query = query.filter(Propiedad.precio >= precio_min)
    # filtrar por precio máximo
    if precio_max is not None:
        query = query.filter(Propiedad.precio <= precio_max)
    # filtrar por número de habitaciones
    if habitaciones is not None:
        query = query.filter(Propiedad.habitaciones >= habitaciones)

    # filtrar por número de baños
    if banos is not None:
        query = query.filter(Propiedad.banos >= banos)
    # Ordenar por más reciente
    query = query.order_by(desc(Propiedad.id))

    return query.all()

def obtener_propiedades_agente(
        db: Session,
        usuario: Usuario,
        tipo_id: Optional[int] = None,
        precio_min: Optional[float] = None,
        precio_max: Optional[float] = None,
        habitaciones: Optional[int] = None,
        banos: Optional[int] = None
):

    query = db.query(Propiedad).filter(Propiedad.agente_id == usuario.id)
    # Validar rango de precios
    if precio_min is not None and precio_max is not None:
        if precio_min > precio_max:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="El precio mínimo no puede ser mayor que el precio máximo"
            )
    # Aplicar filtros
    # filtrar por tipo de inmueble
    if tipo_id is not None:
        query = query.filter(Propiedad.tipo_id == tipo_id)
    # filtrar por precio mínimo
    if precio_min is not None:
        query = query.filter(Propiedad.precio >= precio_min)
    # filtrar por precio máximo
    if precio_max is not None:
        query = query.filter(Propiedad.precio <= precio_max)
    # filtrar por número de habitaciones
    if habitaciones is not None:
        query = query.filter(Propiedad.habitaciones >= habitaciones)

    # filtrar por número de baños
    if banos is not None:
        query = query.filter(Propiedad.banos >= banos)
    # Ordenar por más reciente
    query = query.order_by(desc(Propiedad.id))

    return query.all()


def buscar_propiedades(
    db: Session,
    propiedad_id: Optional[int] = None,
    titulo: Optional[str] = None,
    direccion: Optional[str] = None
):
    """
    Buscar propiedades por ID, título o dirección.
    Si se envía más de un parámetro, se aplicará OR entre ellos.
    """
    query = db.query(Propiedad)

    # Construir filtros según lo que se envíe
    filtros = []
    if propiedad_id is not None:
        filtros.append(Propiedad.id == propiedad_id)
    if titulo is not None:
        filtros.append(Propiedad.titulo.ilike(f"%{titulo}%"))
    if direccion is not None:
        filtros.append(Propiedad.direccion.ilike(f"%{direccion}%"))

    if filtros:
        query = query.filter(or_(*filtros))

    # Ordenar por más reciente
    query = query.order_by(desc(Propiedad.id))

    resultados = query.all()
    if not resultados:
        raise HTTPException(
            status_code=404,
            detail="No se encontraron propiedades que coincidan con los criterios"
        )

    return resultados
