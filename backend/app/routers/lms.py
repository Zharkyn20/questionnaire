from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

# from backend.app.backend.azure_language_processing import sample
from backend.app.backend.config import get_db_session
# from backend.app.backend.gemini import gemini
from backend.app.models import LMS
from backend.app.services.auth import create_access_token, create_refresh_token, verify_token
from backend.app.services.verify_email import send_code_to_email, verify_verification_code, check_email_is_verified

router = APIRouter(prefix='/lms', tags=['LMS'])


@router.post("/register/")
async def register_user(email: str, name: str, password: str, db: Session = Depends(get_db_session)):
    """
    Register a new LMS - Learning Management System.
    """
    user = db.query(LMS).filter(LMS.email == email).first()
    if user:
        raise HTTPException(status_code=400, detail="Email already exists")

    user = LMS(email=email, name=name)

    user.set_password(password)
    db.add(user)
    db.commit()

    access_token, access_token_lifetime = create_access_token(data={"sub": user.email})
    refresh_token = create_refresh_token(data={"sub": user.email})

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "access_token_lifetime": access_token_lifetime
    }


@router.post("/login/")
async def login_user(email: str, password: str, db: Session = Depends(get_db_session)):
    """
    Login a LMS.
    """
    user = db.query(LMS).filter(LMS.email == email).first()
    if not user or not user.check_password(password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    access_token, access_token_lifetime = create_access_token(data={"sub": user.email})
    refresh_token = create_refresh_token(data={"sub": user.email})

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "access_token_lifetime": access_token_lifetime
    }


@router.post("/refresh/")
async def refresh_tokens(refresh_token: str, db: Session = Depends(get_db_session)):
    """
    Refresh access token using refresh token.
    """
    try:
        payload = verify_token(refresh_token)
        email = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        user = db.query(LMS).filter(LMS.email == email).first()
        if not user:
            raise HTTPException(status_code=401, detail="Invalid token")
        access_token, access_token_lifetime = create_access_token(data={"sub": user.email})
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "access_token_lifetime": access_token_lifetime
        }
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid token")
#
# @router.get("/lms/")
# async def get_lms(db: Session = Depends(get_db_session)):
#     """
#     Get all LMS.
#     """
#     response = gemini()
#     return response
