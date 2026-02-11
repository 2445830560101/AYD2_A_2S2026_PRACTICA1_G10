from fastapi import FastAPI
from app.api.usuarios import router as usuarios_router
from app.api.auth import router as auth_router
from app.api.propiedad import router as propiedad_router
from app.api.agentes import router as agentes_router
from app.api.cita import router as cita_router
from app.api.foto import router as foto_router
from fastapi.staticfiles import StaticFiles

app = FastAPI()

# Hacer pública la carpeta imagenes
app.mount("/imagenes", StaticFiles(directory="imagenes"), name="imagenes")

# Routers
app.include_router(usuarios_router)
app.include_router(auth_router)
app.include_router(propiedad_router)
app.include_router(agentes_router)
app.include_router(cita_router)
app.include_router(foto_router)
