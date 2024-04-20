from pydantic import BaseModel, BaseSettings


class DatabaseConfig(BaseModel):
    dsn: str = "postgresql://user:password@host:port/dbname"


class Config(BaseSettings):
    database: DatabaseConfig = DatabaseConfig()
    token_key: str = ""

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        env_prefix = "MYAPI_"
        env_nested_delimiter = "__"
        case_sensitive = False


config = Config()
