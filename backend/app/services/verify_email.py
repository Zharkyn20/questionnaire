import smtplib
import redis
import random
import string
from datetime import datetime, timedelta
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from backend.app.backend.config import email_host, email_port, email_username, email_password, redis_client


def generate_verification_code():
    """
    Generate a random 6-digit verification code.
    """
    return ''.join(str(random.randint(0, 9)) for _ in range(6))


def send_code_to_email(email: str):
    """
    Send a verification code to the specified email address.
    """
    # Generate a verification code
    verification_code = generate_verification_code()
    store_verification_code(email, verification_code)

    # Email configuration
    sender_email = email_username
    sender_password = email_password
    receiver_email = email
    subject = "Verification Code"
    body = f"Your verification code is: {verification_code}"

    message = MIMEMultipart()
    message["From"] = sender_email
    message["To"] = receiver_email
    message["Subject"] = subject

    message.attach(MIMEText(body, "plain"))

    try:
        with smtplib.SMTP(email_host, email_port) as server:
            server.starttls()
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, receiver_email, message.as_string())
    except Exception as e:
        print("Failed to send email:", e)
        return False
    return True


def store_verification_code(email: str, code: str):
    """
    Store the verification code in Redis for 5 minutes.
    """
    redis_client.setex(email, 300, code)


def verify_verification_code(email: str, entered_code: str):
    """
    Verify the verification code sent to the email.
    """
    stored_code = redis_client.get(email)
    print(stored_code, entered_code)
    if stored_code and stored_code.decode('utf-8') == entered_code:
        store_email_is_verified(email)
        return True
    else:
        return False


def store_email_is_verified(email: str):
    """
    Store that the email is verified.
    """
    redis_client.set(f"{email}-verification_state", 'verified', ex=timedelta(days=1))


def check_email_is_verified(email: str):
    """
    Check if the email is verified.
    """
    return redis_client.get(f"{email}-verification_state") == b'verified'
