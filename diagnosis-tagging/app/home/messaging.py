def send_sms(numbers, message):
    import requests
    url = "https://www.fast2sms.com/dev/bulk"
    payload = "sender_id=FSTSMS&message=" + message+ "&language=english&route=p&numbers=" + numbers
    print(payload)
    headers = {
    'authorization': "htwbnOvs8QkdASeaLmVf2jg714ZEMCpNGuFDJXWUTcl53rRzi0NCBOWxl9H6QZ7eToFwY5hMSkDXbAyj",
    'Content-Type': "application/x-www-form-urlencoded",
    'Cache-Control': "no-cache",
    }
    response = requests.request("POST", url, data=payload, headers=headers)
    print(response.text)
