from fastapi import FastAPI
from app.api.usuarios import router as usuarios_router
from app.api.auth import router as auth_router
from app.api.propiedad import router as propiedad_router
from app.api.agentes import router as agentes_router
from app.api.cita import router as cita_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",    # El origen de tu Frontend (Next.js)
    "http://127.0.0.1:3000",    # Alternativa por si usas la IP
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,      # Lista de orígenes permitidos
    allow_credentials=True,     # Permitir cookies/tokens
    allow_methods=["*"],        # Permitir todos los métodos (GET, POST, PUT, DELETE...)
    allow_headers=["*"],        # Permitir todos los headers (Authorization, Content-Type...)
)

# Routers
app.include_router(usuarios_router)
app.include_router(auth_router)
app.include_router(propiedad_router)
app.include_router(agentes_router)
app.include_router(cita_router)
