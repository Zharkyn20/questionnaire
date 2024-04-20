from fastapi import FastAPI
from const import (
    OPEN_API_DESCRIPTION,
    OPEN_API_TITLE,
)

from routers import course

app = FastAPI(
    title=OPEN_API_TITLE,
    description=OPEN_API_DESCRIPTION,
)


@app.get("/")
async def root():
    return {"message": "Hello World"}


app.include_router(course.router)


