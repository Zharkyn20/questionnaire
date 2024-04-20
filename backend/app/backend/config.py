from sqlalchemy import create_engine
from sqlalchemy.engine import URL
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv
import os

load_dotenv()

db_host = os.getenv("DB_HOST")
db_user = os.getenv("DB_USER")
db_password = os.getenv("DB_PASSWORD")

url = URL.create(
    drivername="postgresql",
    username=f"{db_user}",
    password=f"{db_password}",
    host=f"{db_host}",
    database="mydb",
    port=5432
)

engine = create_engine(url)
Session = sessionmaker(bind=engine)
session = Session()

Base = declarative_base()

Base.metadata.create_all(engine)
