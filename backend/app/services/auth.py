import jwt
from datetime import datetime, timedelta

from fastapi import Depends, HTTPException, Header

from backend.app.backend.config import get_db_session
from backend.app.models import LMS
from backend.app.backend.config import secret_key, algorithm, access_token_expire_minutes, refresh_token_expire_minutes


def create_access_token(data: dict):
    expires_delta = timedelta(minutes=access_token_expire_minutes)
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, secret_key, algorithm=algorithm)
    return encoded_jwt, expires_delta.total_seconds()


def create_refresh_token(data: dict):
    expires_delta = timedelta(minutes=refresh_token_expire_minutes)
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, secret_key, algorithm=algorithm)
    return encoded_jwt


def verify_token(token: str):
    """
    Verify the JWT token and return the payload if valid.
    """
    try:
        payload = jwt.decode(token, secret_key, algorithms=[algorithm])
        return payload
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


def get_current_user(authorization: str = Header(...)):
    """
    Get the current user based on the authorization token.
    """
    token = authorization.split(" ")[1]
    try:
        payload = verify_token(token)
        email = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        db = next(get_db_session())
        user = db.query(LMS).filter(LMS.email == email).first()
        return user
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


def is_authenticated(current_user: str = Depends(get_current_user)):
    """
    Check if the user is authenticated.
    """
    if current_user:
        return True
    else:
        raise HTTPException(status_code=401, detail="Not authenticated")

