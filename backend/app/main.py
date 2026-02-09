from core.database import db, Base
from sqlalchemy import text
from models.rol import Rol

# probar coneccion a la base de datos


def test_db():
    session = db.SessionLocal()

    try:
        result = session.execute(text("SELECT 1"))
        print("✅ Conexión exitosa:", result.scalar())
    except Exception as e:
        print("❌ Error de conexión:", e)
    finally:
        session.close()


# probar OR
# def test_roles():
#     session = db.SessionLocal()
#     try:
#         roles = session.query(Rol).all()

#         print(f"🎭 Total de roles: {len(roles)}")
#         for r in roles:
#             print(f"ID={r.id} | nombre={r.nombre}")
#     except Exception as e:
#         print("❌ Error:", e)
#     finally:
#         session.close()


if __name__ == "__main__":
    test_db()
    # test_roles()
