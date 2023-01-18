from typing import List
from pydantic import EmailStr
from settings import AppSettings, EmailSettings
import smtplib, ssl
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from fastapi_jwt_auth import AuthJWT
from threading import Thread
import logging

logger = logging.getLogger(__name__)

def as_thread(f):
    def wrapper(*args, **kwargs):
        thr = Thread(target=f, args=args, kwargs=kwargs)
        thr.start()
    return wrapper

DEMO_TEMPLATE = '''
<html>
<body>
TEST EMAIL
</body>
</html>
'''

@as_thread
def send_email(subject: str, recipients: List[EmailStr], body = DEMO_TEMPLATE):
    context = ssl.create_default_context()
    for recipient in recipients:
        with smtplib.SMTP_SSL(EmailSettings().email_server_hostname, EmailSettings().email_server_port, context=context) as server:         
            server.login(EmailSettings().email_server_username, EmailSettings().email_server_password)
            email_message = MIMEMultipart()
            email_message['From'] = EmailSettings().email_sender
            email_message['Subject'] = subject
            email_message.attach(MIMEText(body, 'html'))
            email_message['To'] = recipient
            try:
                server.sendmail(EmailSettings().email_sender, recipient, email_message.as_string())
                logger.info(f'sent email to {recipient} succesfully.')
            except Exception as e:
                logger.warn(f'Could not send email to {recipient}. Reason: {e}')

async def send_activation_email(recipient: EmailStr):
    activation_token = AuthJWT().create_access_token(subject=recipient)
    activation_url = f'{AppSettings().app_web_url}/#/activate/{recipient}?token={activation_token}'
    template = f"""
    <html>
    <div>
        Activate your account by clicking on the button below
        <br/>
        <a href=\"{activation_url}\">Activate account</a>
    </div>
    </html>
    """
    send_email('Activate your account', [recipient], template)
