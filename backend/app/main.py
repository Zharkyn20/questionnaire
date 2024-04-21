from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from backend.app.backend.config import Base, engine, cors_origins
from backend.app.const import (
    OPEN_API_DESCRIPTION,
    OPEN_API_TITLE,
)

from backend.app.routers import course, lms


Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=OPEN_API_TITLE,
    description=OPEN_API_DESCRIPTION,
)

origins = cors_origins

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World"}


app.include_router(course.router)
app.include_router(lms.router)
