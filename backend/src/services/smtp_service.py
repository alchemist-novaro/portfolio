import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
import os

from src.config import settings

def get_verify_email_for_create_account_html(url, name):
    return f"""<!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
    <title>Email Verification</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <style>
      html, body {{ margin:0 !important; padding:0 !important; height:100% !important; width:100% !important; }}
      * {{ -ms-text-size-adjust:100%; -webkit-text-size-adjust:100%; }}
      a {{ text-decoration:none; }}
      img {{ border:0; outline:none; text-decoration:none; -ms-interpolation-mode:bicubic; }}
      table {{ border-collapse:collapse !important; }}
      a[x-apple-data-detectors] {{ color:inherit !important; text-decoration:none !important; }}
      u + #body a {{ color:inherit; text-decoration:none; }}

      .wrapper {{ width:100%; background: #ffffff; }}
      .container {{ width:100%; max-width:600px; margin:0 auto; }}

      .card {{ background: #fafafa; text-align:center; }}

      .px {{ padding-left:32px; padding-right:32px; }}
      .py {{ padding-top:32px; padding-bottom:32px; }}

      .title {{ font-family: 'Inter', system-ui, sans-serif; font-weight:700; font-size:22px; line-height:1.25; color: #080a0c; margin:0; }}
      .name {{ font-family: 'Inter', system-ui, sans-serif; font-weight:400; font-size:15px; line-height:1.5; color: #080a0c; margin:4px 0 20px 0; }}
      .body {{ font-family: 'Inter', system-ui, sans-serif; font-weight:400; font-size:15px; line-height:1.7; color: #080a0c; }}
      .muted {{ color: #0b1230; }}

      .btn {{ display:inline-block; background: #6d28d9; color: #f8fafc !important; border-radius:12px; padding:14px 28px; font-weight:700; font-size:15px; font-family: 'Inter', system-ui, sans-serif; letter-spacing:0.3px; }}
      .btn:hover {{ filter: brightness(1.05); }}

      .divider {{ height:1px; background: #e0e0e0; margin:24px 0; }}

      .avatar {{ border-radius:50%; width:72px; height:72px; object-fit:cover; margin-bottom:12px; }}

      .footer {{ font-family: 'Inter', system-ui, sans-serif; font-size:11px; color: #0b1230; margin-top:16px; text-align:center; }}
      .footer a {{ color: #6d28d9; text-decoration:none; font-weight:600; }}
    </style>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
  </head>

  <body id="body" style="margin:0; padding:0; background: #ffffff;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #ffffff;">
      <tr>
        <td align="center" style="padding: 40px 16px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" class="container">
            <tr>
              <td class="px py card">
                
                <img src="https://i.ibb.co/zHTsJZyF/photo-2025-08-05-07-52-15.jpg" alt="Alchemist Novaro" class="avatar">
                <h1 class="title"><string>Alchemist Novaro</string></h1>
                <p class="name">Email Verification</p>
                
                <div class="divider"></div>
                
                <p class="body" style="margin:0 0 20px 0;">Hello, {name}.</p>
                <p class="body" style="margin:0 0 20px 0;">Thank you for joining <strong>Alchemist Novaro's Portfolio</strong>. To activate your account and confirm your email address, please click the button below:</p>
                
                <a class="btn" href="{url}" target="_blank">Verify Email</a>
                
                <div class="divider"></div>
                
                <p class="body muted" style="margin:20px 0 0 0;">This link and code will expire in <strong>15 minutes</strong>. If you didn't initiate this request, you may safely disregard this email.</p>
                
                <div class="divider"></div>
                
                <p class="body muted" style="font-size:12px; margin:0 0 8px 0;"><strong>Alchemist Novaro</strong> • Centralized & Decentralized AI Specialist</p>
                <p class="body muted" style="font-size:12px; margin:0;">You're receiving this message because your email address was used to register at <strong>Alchemist Novaro's Portfolio</strong>.</p>
                <p style="margin:12px 0 0 0; font-size:12px;" class="body muted">
                  <a href="https://alchemist-novaro.portfolio-app.online/privacy-policy" target="_blank">Privacy Policy</a> • 
                  <a href="https://alchemist-novaro.portfolio-app.online/terms-of-service" target="_blank">Terms of Service</a>
                </p>
              </td>
            </tr>
          </table>

          <!-- Footer Outside Card -->
          <p class="footer">© 2025 <strong>Alchemist Novaro</strong>. All rights reserved.</p>
        </td>
      </tr>
    </table>
  </body>
</html>"""

def get_verify_email_for_reset_password_html(url, name):
    return f"""<!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
    <title>Password Reset Verification</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <style>
      html, body {{ margin:0 !important; padding:0 !important; height:100% !important; width:100% !important; }}
      * {{ -ms-text-size-adjust:100%; -webkit-text-size-adjust:100%; }}
      a {{ text-decoration:none; }}
      img {{ border:0; outline:none; text-decoration:none; -ms-interpolation-mode:bicubic; }}
      table {{ border-collapse:collapse !important; }}
      a[x-apple-data-detectors] {{ color:inherit !important; text-decoration:none !important; }}
      u + #body a {{ color:inherit; text-decoration:none; }}

      .wrapper {{ width:100%; background: #ffffff; }}
      .container {{ width:100%; max-width:600px; margin:0 auto; }}

      .card {{ background: #fafafa; text-align:center; }}

      .px {{ padding-left:32px; padding-right:32px; }}
      .py {{ padding-top:32px; padding-bottom:32px; }}

      .title {{ font-family: 'Inter', system-ui, sans-serif; font-weight:700; font-size:22px; line-height:1.25; color: #080a0c; margin:0; }}
      .name {{ font-family: 'Inter', system-ui, sans-serif; font-weight:400; font-size:15px; line-height:1.5; color: #080a0c; margin:4px 0 20px 0; }}
      .body {{ font-family: 'Inter', system-ui, sans-serif; font-weight:400; font-size:15px; line-height:1.7; color: #080a0c; }}
      .muted {{ color: #0b1230; }}

      .btn {{ display:inline-block; background: #6d28d9; color: #f8fafc !important; border-radius:12px; padding:14px 28px; font-weight:700; font-size:15px; font-family: 'Inter', system-ui, sans-serif; letter-spacing:0.3px; }}
      .btn:hover {{ filter: brightness(1.05); }}

      .divider {{ height:1px; background: #e0e0e0; margin:24px 0; }}

      .avatar {{ border-radius:50%; width:72px; height:72px; object-fit:cover; margin-bottom:12px; }}

      .footer {{ font-family: 'Inter', system-ui, sans-serif; font-size:11px; color: #0b1230; margin-top:16px; text-align:center; }}
      .footer a {{ color: #6d28d9; text-decoration:none; font-weight:600; }}
    </style>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
  </head>

  <body id="body" style="margin:0; padding:0; background: #ffffff;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #ffffff;">
      <tr>
        <td align="center" style="padding: 40px 16px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" class="container">
            <tr>
              <td class="px py card">
                
                <img src="https://i.ibb.co/zHTsJZyF/photo-2025-08-05-07-52-15.jpg" alt="Alchemist Novaro" class="avatar">
                <h1 class="title"><strong>Alchemist Novaro</strong></h1>
                <p class="name">Password Reset Verification</p>
                
                <div class="divider"></div>
                
                <p class="body" style="margin:0 0 20px 0;">Hello, {name}.</p>
                <p class="body" style="margin:0 0 20px 0;">I received a request to reset the password for your account at <strong>Alchemist Novaro's Portfolio</strong>. If this was you, please confirm the request by clicking the button below:</p>
                
                <a class="btn" href="{url}" target="_blank">Reset Password</a>
                
                <div class="divider"></div>
                
                <p class="body muted" style="margin:20px 0 0 0;">For your security, this link and code will expire in <strong>15 minutes</strong>. If you did not request a password reset, please ignore this email—your account remains safe.</p>
                
                <div class="divider"></div>
                
                <p class="body muted" style="font-size:12px; margin:0 0 8px 0;"><strong>Alchemist Novaro</strong> • Centralized & Decentralized AI Specialist</p>
                <p class="body muted" style="font-size:12px; margin:0;">You're receiving this message because your email address was used to request a password reset on <strong>Alchemist Novaro's Portfolio</strong>.</p>
                <p style="margin:12px 0 0 0; font-size:12px;" class="body muted">
                  <a href="https://alchemist-novaro.portfolio-app.online/privacy-policy" target="_blank">Privacy Policy</a> • 
                  <a href="https://alchemist-novaro.portfolio-app.online/terms-of-service" target="_blank">Terms of Service</a>
                </p>
              </td>
            </tr>
          </table>

          <!-- Footer Outside Card -->
          <p class="footer">© 2025 <strong>Alchemist Novaro</strong>. All rights reserved.</p>
        </td>
      </tr>
    </table>
  </body>
</html>"""

def get_reply_contact_html(name: str):
    return f"""<!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title>Contact Confirmation</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <style>
      html, body {{ margin:0 !important; padding:0 !important; height:100% !important; width:100% !important; }}
      * {{ -ms-text-size-adjust:100%; -webkit-text-size-adjust:100%; }}
      a {{ text-decoration:none; }}
      img {{ border:0; outline:none; text-decoration:none; -ms-interpolation-mode:bicubic; }}
      table {{ border-collapse:collapse !important; }}
      a[x-apple-data-detectors] {{ color:inherit !important; text-decoration:none !important; }}
      u + #body a {{ color:inherit; text-decoration:none; }}

      .container {{ width:100%; max-width:600px; margin:0 auto; }}
      .card {{ background: #fafafa; text-align:center; }}
      .px {{ padding-left:32px; padding-right:32px; }}
      .py {{ padding-top:32px; padding-bottom:32px; }}
      .title {{ font-family: 'Inter', system-ui, sans-serif; font-weight:700; font-size:22px; color: #080a0c; margin:0; }}
      .body {{ font-family: 'Inter', system-ui, sans-serif; font-size:15px; line-height:1.7; color: #080a0c; }}
      .muted {{ color: #0b1230; }}
      .divider {{ height:1px; background: #e0e0e0; margin:24px 0; }}
      .avatar {{ border-radius:50%; width:72px; height:72px; object-fit:cover; margin-bottom:12px; }}
      .footer {{ font-family: 'Inter', system-ui, sans-serif; font-size:11px; color: #0b1230; margin-top:16px; text-align:center; }}
    </style>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
  </head>

  <body id="body" style="margin:0; padding:0; background: #ffffff;">
    <table role="presentation" width="100%" style="background: #ffffff;">
      <tr>
        <td align="center" style="padding: 40px 16px;">
          <table role="presentation" class="container">
            <tr>
              <td class="px py card">
                <img src="https://i.ibb.co/zHTsJZyF/photo-2025-08-05-07-52-15.jpg" alt="Alchemist Novaro" class="avatar">
                <h1 class="title">Alchemist Novaro</h1>
                <p class="body" style="margin:0 0 20px 0;">Hello, {name}.</p>
                
                <div class="divider"></div>

                <p class="body">Thank you for contacting me through my portfolio site. I've received your message and will get back to you as soon as possible.</p>
                <p class="body">I typically respond to messages within <strong>24 hours</strong>. For urgent inquiries, please reply to this email directly.</p>

                <div class="divider"></div>
                <p class="body muted" style="font-size:12px; margin:0;"><strong>Alchemist Novaro</strong> • Centralized & Decentralized AI Specialist</p>
                <p class="body muted" style="font-size:12px; margin:0;">You're receiving this message because you contacted me via <strong>Alchemist Novaro's Portfolio</strong>.</p>
              </td>
            </tr>
          </table>

          <!-- Footer -->
          <p class="footer">© 2025 <strong>Alchemist Novaro</strong>. All rights reserved.</p>
        </td>
      </tr>
    </table>
  </body>
</html>"""

def send_email_with_attachment(recipient_email, subject, body, html_body=None, attachment_path=None):
    message = MIMEMultipart('alternative')
    message['From'] = settings.SMTP_EMAIL_ADDRESS
    message['To'] = recipient_email
    message['Subject'] = subject
    
    part1 = MIMEText(body, 'plain')
    message.attach(part1)
    
    if html_body:
        part2 = MIMEText(html_body, 'html')
        message.attach(part2)
    
    if attachment_path and os.path.exists(attachment_path):
        with open(attachment_path, "rb") as attachment:
            part = MIMEBase('application', 'octet-stream')
            part.set_payload(attachment.read())
        encoders.encode_base64(part)
        part.add_header(
            'Content-Disposition',
            f'attachment; filename= {os.path.basename(attachment_path)}',
        )
        message.attach(part)
    
    with smtplib.SMTP('smtp.gmail.com', 587) as server:
        server.starttls()
        server.login(settings.SMTP_EMAIL_ADDRESS, settings.SMTP_PASSWORD)
        server.send_message(message)

def send_verification_email_for_create_account(recipient_email: str, first_name: str, last_name: str, verification_url: str):
    subject = "Verify your email for Alchemist Novaro's Portfolio"
    
    html_content = get_verify_email_for_create_account_html(verification_url, f"{first_name} {last_name}")
    
    text_content = f"""
    Welcome to Alchemist Novaro's Portfolio

    Hello, {first_name} {last_name}.
    
    To activate your account and confirm your email address, please visit:
    {verification_url}
    
    This link will expire in 15 minutes.
    
    If you didn't request this, please ignore this email.
    """
    
    send_email_with_attachment(
        recipient_email=recipient_email,
        subject=subject,
        body=text_content,
        html_body=html_content
    )

def send_verification_email_for_reset_password(recipient_email: str, first_name: str, last_name: str, verification_url: str):
    subject = "Password Reset Verification for Alchemist Novaro's Portfolio"
    
    html_content = get_verify_email_for_reset_password_html(verification_url, f"{first_name} {last_name}")
    
    text_content = f"""
    Password Reset Request

    Hello, {first_name} {last_name}.
    
    To reset your password, please visit:
    {verification_url}
    
    This link will expire in 15 minutes. If you didn't request a password reset, 
    please ignore this email or contact us immediately.
    
    Security recommendations:
    - Never share this link with anyone
    - Create a strong, unique password
    - Update your password regularly
    """
    
    send_email_with_attachment(
        recipient_email=recipient_email,
        subject=subject,
        body=text_content,
        html_body=html_content
    )

def send_contact_confirmation_email(recipient_email: str, first_name: str, last_name: str):
    subject = "Thanks for contacting Alchemist Novaro's Portfolio"

    html_content = get_reply_contact_html(f"{first_name} {last_name}")

    text_content = f"""
    Hello, {first_name} {last_name}.

    Thank you for contacting me through my portfolio site. I've received your message and will get back to you as soon as possible.

    I typically respond to messages within 24 hours.
    For urgent inquiries, please reply to this email.

    Best regards,
    Alchemist Novaro
    """

    send_email_with_attachment(
        recipient_email=recipient_email,
        subject=subject,
        body=text_content,
        html_body=html_content
    )