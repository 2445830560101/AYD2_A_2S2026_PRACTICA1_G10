
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.core.config import DATABASE_URL


class Database:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)

            engine = create_engine(
                DATABASE_URL,
                pool_pre_ping=True
            )

            cls._instance.engine = engine
            cls._instance.SessionLocal = sessionmaker(
                autocommit=False,
                autoflush=False,
                bind=engine
            )

        return cls._instance


db = Database()
Base = declarative_base()
