Para ejecutar el backend

1.  Crear entorno

        python -m venv venv

2.  Activar entorno

        venv\Scripts\activate

3.  Instalar dependencias

        pip install -r requirements.txt

4.  Desde la terminal con el entorno activo dentro del directorio de backend

        uvicorn app.main:app --reload
