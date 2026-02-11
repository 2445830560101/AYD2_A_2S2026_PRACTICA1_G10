from fastapi import FastAPI
from app.api.usuarios import router as usuarios_router
from app.api.auth import router as auth_router
from app.api.propiedad import router as propiedad_router
from app.api.agentes import router as agentes_router

app = FastAPI()

# Routers
app.include_router(usuarios_router)
app.include_router(auth_router)
app.include_router(propiedad_router)
app.include_router(agentes_router)
