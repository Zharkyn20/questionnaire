import bcrypt
from sqlalchemy import Column, Integer, String

from backend.app.backend.config import Base


class LMS(Base):
    __tablename__ = "lms"

    id = Column(Integer, primary_key=True)
    name = Column(String, index=True)
    email = Column(String, index=True)
    hashed_password = Column(String)

    def set_password(self, password):
        """
        Hashes the provided password and sets it as the user's password hash.
        """
        pwhash = bcrypt.hashpw(password.encode('utf8'), bcrypt.gensalt())
        self.hashed_password = pwhash.decode('utf8')

    def check_password(self, password):
        """
        Checks if the provided password matches the user's password hash.
        """
        return bcrypt.checkpw(password.encode('utf-8'), self.hashed_password.encode('utf-8'))

    @classmethod
    def authenticate(cls, session, email, password):
        """
        Authenticates a user by email and password.

        Args:
            session: SQLAlchemy session object.
            email: Email of the user to authenticate.
            password: Password of the user to authenticate.

        Returns:
            User object if authentication succeeds, None otherwise.
        """
        user = session.query(cls).filter(cls.email == email).first()
        if user and user.check_password(password):
            return user
        return None
