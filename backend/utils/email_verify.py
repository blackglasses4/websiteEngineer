import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.utils import formataddr
from fastapi import HTTPException

SMTP_SERVER = os.getenv("VERIFY_SMTP_SERVER")
SMTP_PORT = os.getenv("VERIFY_SMTP_PORT")
EMAIL_ADDRESS = os.getenv("VERIFY_EMAIL_ADDRESS")
EMAIL_PASSWORD = os.getenv("VERIFY_EMAIL_PASSWORD")
BASE_URL = os.getenv("VERIFY_BASE_URL")

def send_verification_email(recipient_email: str, token: str):
    if not all([SMTP_SERVER, SMTP_PORT, EMAIL_ADDRESS, EMAIL_PASSWORD, BASE_URL]):
        raise HTTPException(status_code=500, detail="SMTP or BASE_URL environment variables not configured")
    
    try:
        sender_name = "OnlineGearUp.pl"
        subject = "Zweryfikuj swoje konto."
        verification_link = f"{BASE_URL}?token={token}"
        body = f"""
        Prosimy o zweryfikowanie konta.
        
        Aby zweryfikować konto klinkij na link poniżej:
        {verification_link}.
        
        Dziękujemy i życzymy udanych zakupów.
        OnlineGearUp.
        """
        
        msg = MIMEMultipart()
        msg['From'] = formataddr((sender_name, EMAIL_ADDRESS))
        msg['To'] = recipient_email
        msg['Subject'] = subject
        msg.attach(MIMEText(body, 'plain'))
        
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            server.sendmail(EMAIL_ADDRESS, recipient_email, msg.as_string())
            print(f"Verification email sent to {recipient_email}")
    except Exception as e:
        print(f"Error sending email: {e}")
        raise HTTPException(status_code=500, detail="Failed to send verification email")
