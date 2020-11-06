import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import csv
import time


def bulkMailer(reader, medicine):
    sender_email = ""
    # receiver_email = "receiver_mail@gmail.com"
    password = ""
    message = MIMEMultipart("alternative")
    message["Subject"] = "💊 Checkout the new drug on market"
    message["From"] = sender_email
    context = ssl.create_default_context()
    server = smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context)
    server.ehlo()
    server.login(sender_email, password)
    with open('app/home/templates/mail.html', 'r', encoding="utf8") as file:
        data = file.read().replace('\n', '')
    count = 0
    #reader = [['Sai Adarsh', 'sivakumar.sk11865.sk@gmail.com', '#'], ['Rajasekar', 'rajasekar1999@gmail.com', '#']]
    for x in reader:
        L = ", ".join(x).split(', ')
        name, email, link = L[0], L[1], L[2]
        drug = medicine
        # Create the plain-text and HTML version of your message
        html = data.format(name=name, link=link, drug=drug)

        # Add HTML/plain-text parts to MIMEMultipart message
        # The email client will try to render the last part first
        message.attach(MIMEText(html, "html"))

        server.sendmail(
            sender_email, email, message.as_string()
        )

        count += 1
        print(str(count) + ". Sent to " + email)

        if(count%80 == 0):
            server.quit()
            print("Server cooldown for 100 seconds")
            time.sleep(100)
            server.ehlo()
            server.login(sender_email, password)

    server.quit()
