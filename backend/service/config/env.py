from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Loads the dotenv file. Including this is necessary to get
    pydantic to load a .env file."""

    AZURE_ENDPOINT: str
    API_KEY: str
    API_VERSION: str
    MODEL: str
    DB_URL: str
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        
env = Settings()
