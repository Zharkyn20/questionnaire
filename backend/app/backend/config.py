import os
import redis
from sqlalchemy import create_engine
from sqlalchemy.engine import URL
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv


load_dotenv()

db_host = os.getenv("POSTGRES_HOST")
db_user = os.getenv("POSTGRES_USER")
db_password = os.getenv("POSTGRES_PASSWORD")
db_name = os.getenv("POSTGRES_DB")
db_port = os.getenv("POSTGRES_PORT")

url = URL.create(
    drivername="postgresql",
    username=db_user,
    password=db_password,
    host=db_host,
    database=db_name,
    port=db_port
)

print(url)
engine = create_engine(url)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db_session():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# JWT token settings
secret_key = os.getenv("SECRET_KEY")  # Secret key for JWT token
algorithm = os.getenv("ALGORITHM")  # algorithm used to sign JWT token
access_token_expire_minutes = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))  # Access token expiration time
refresh_token_expire_minutes = int(os.getenv("REFRESH_TOKEN_EXPIRE_MINUTES"))  # Refresh token expiration time

# Email settings
email_username = os.getenv("SENDER_EMAIL")
email_password = os.getenv("SENDER_EMAIL_PASSWORD")
email_host = os.getenv("EMAIL_HOST")
email_port = os.getenv("EMAIL_PORT")

# Redis client
redis_client = redis.Redis(host=os.getenv("REDIS_HOST"), port=os.getenv("REDIS_PORT"), db=0)

# Cors settings
cors_origins = os.getenv("CORS_ORIGINS").split(" ") or ["*"] # List of allowed origins

# ChatGPT settings
openai_api_key = os.getenv("OPENAI_API_KEY")

# Azure settings
azure_key, azure_endpoint = os.getenv("AZURE_QUESTIONANSWERING_KEY"), os.getenv("AZURE_QUESTIONANSWERING_ENDPOINT")
