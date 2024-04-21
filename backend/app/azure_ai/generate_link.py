# Function for link generation
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import rsa, padding
from cryptography.hazmat.backends import default_backend

def get_test_link(user_id):
    token = 12345
    return "link/example/" + str(token)


def open_token(token):
    # Логика с расшифровкой
    return token


