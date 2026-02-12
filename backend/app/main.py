from fastapi import FastAPI
from app.api.usuarios import router as usuarios_router
from app.api.auth import router as auth_router
from app.api.propiedad import router as propiedad_router
from app.api.agentes import router as agentes_router
from app.api.cita import router as cita_router
from app.api.cliente import router as cliente_router
from app.api.tipo_inmueble import router as tipo_inmueble_router
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
from app.api.foto import router as foto_router

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

# Hacer pública la carpeta imagenes
app.mount("/imagenes", StaticFiles(directory="imagenes"), name="imagenes")

# Routers
app.include_router(usuarios_router)
app.include_router(auth_router)
app.include_router(propiedad_router)
app.include_router(agentes_router)
app.include_router(cita_router)
app.include_router(cliente_router)
app.include_router(foto_router)
app.include_router(tipo_inmueble_router)

# Montar la carpeta de fotos como estática
base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMAGENES_DIR_NAME = "imagenes"
UPLOAD_DIR = os.path.join(base_dir, IMAGENES_DIR_NAME)
os.makedirs(UPLOAD_DIR, exist_ok=True)
app.mount(f"/{IMAGENES_DIR_NAME}", StaticFiles(directory=UPLOAD_DIR), name="imagenes")