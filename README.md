## AGBI Hackathon - Team Appendly 🚀
![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)
![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)
![forthebadge](https://forthebadge.com/images/badges/made-with-python.svg)

<img src="https://media-fastly.hackerearth.com/media/hackathon/agbi-digital-healthtech-grand-challenge/images/4e1412d2d7-great_lakes_he_cover-01-01-01-01-01-01-01-01.png" width="100%">

### Problem Statement 🤔:
* ### Diagnosis Tagging for Digital Marketing:
* Currently, hospitals rely on mass marketing campaigns to inform patients of a relevant treatment or drug available to further improve their health. Build applications that can help hospitals, patients, pharmaceutical companies, and health R&D companies with more efficient and effective ways of communication by hospitals for better health outcomes and targeted communication to prime patient groups for a new treatment/drug leveraging the power of data analytics. Your solution needs to manage the database of patient records and discharge summaries to identify patients who are good candidates for newly launched medicines, treatments etc.

### Objectives ✔️:
* To convert decades of handwritten hospital documents and reports into text and store it in a database for analytics.
* To visualize the data and derive insights out of them for better health outcomes.
* To have the database of patients and drugs at one place.
* To apply filter on those data and implement targeted marketing of new drugs and treatments.
* To establish a perennial digital bridge between patients and hospital

### Our Solution 👨‍💻:
<img src="https://github.com/Sai-Adarsh/agbi-hackathon/blob/main/diagnosis-tagging/app/base/static/assets/img/icon.png" width="30%">

* Mehta's Digital Marketing [Webapp](https://github.com/Sai-Adarsh/agbi-hackathon/tree/main/diagnosis-tagging)
* Mehta's OCRApp
* Mehta's PatientsApp

### Demo URL 📱:
* Mehta's Digital Marketing: [webapp](https://agbihackathon.herokuapp.com/) 💻
* Mehta's OCRApp [apk](https://github.com/Sai-Adarsh/agbi-hackathon/raw/main/ocrapp/build/mehtaocrapp.apk) • [snack](https://expo.io/@saiadarsh99/mehta-ocr) 📱
* Mehta's PatientsApp [apk](https://github.com/Sai-Adarsh/agbi-hackathon/raw/main/patients-sms-app/android/app/patients-sms-app.apk) 📱

### Architecture 😎: 

<img src="https://github.com/Sai-Adarsh/agbi-hackathon/blob/main/diagnosis-tagging/architecture.png" width="90%">
<img src="https://github.com/Sai-Adarsh/agbi-hackathon/blob/main/diagnosis-tagging/architecture(1).png" width="90%">

### Tech Stacks ⚛️:

<img src="https://github.com/Sai-Adarsh/agbi-hackathon/blob/main/diagnosis-tagging/stack.png" width="90%">

### Installation 📦:
* ## Digital Marketing Webapp
* Clone the repo
```sh
   $ git clone https://github.com/Sai-Adarsh/agbi-hackathon
```
```sh
   $ cd agbi-hackathon/diagnosis-tagging
```
* Create virtualenv
```sh
   $ virtualenv venv
```
* For Linux
```sh
   $ source ./venv/bin/activate
```
* For windows
```sh
   $ cd venv/Scripts/
```
```sh
   $ activate
```
* Install dependencies
```sh
   $ pip install -r requirements.txt
```
* ### How to run 💡:
* Run the webapp locally
```sh
   $ python run.py
```
* Now, the application runs in [localhost](http://127.0.0.1:5000/)
* ## OCR App
```sh
   $ cd agbi-hackathon/ocrapp
```
```sh
   $ yarn
```
```sh
   $ yarn start
```
* ## Patients App
```sh
   $ cd agbi-hackathon/patients-sms-app
```
```sh
   $ flutter run
```

## Instructions 📋:
### OCR App 📱
* There are two ways to use the OCR App:
* Tap the camera icon -> take a photo of the target -> tap convert
* Tap the file icon -> choose photo from the gallery -> tap convert
* If you wish to add the text/photo to the Firebase:
* Tap push to database to store the image/text in cloud.

### Web App 💻
* Initially register yourself in the Web App.
* Login using your registered credentials.
* Navigate to any of the pages using the Navigation bar in the left.
* Click the buttons 'add drug details', 'add patient details' in the respective tabs to add their details to the firebase.
* Use the text box below the table headers to search/filter the drug/patient details accordingly.
* Use the Send Notification tab to generate a list of patients taking a particular medication by clicking the generate button beside their details.
* Click the button fire notification to send notification to the target group.
* You can also view the details of each patient / drug / your profile by clicking the respective links.
* Logout tab logs you out of the application.

### Patients App 📱
* Just opening the app will fetch you all the messages from the Hospital side.


### Authors 📋:
<p> Made with ❤</p>

* Sai Adarsh
* Rajasekar
* LS Meenatchi

[<img src="https://image.flaticon.com/icons/svg/185/185961.svg" width="35" padding="10">](https://twitter.com/ad6rsh)
[<img src="https://image.flaticon.com/icons/svg/185/185964.svg" width="35" padding="10">](https://www.linkedin.com/in/sai-adarsh/)
[<img src="https://image.flaticon.com/icons/svg/185/185981.svg" width="35" padding="10">](https://www.facebook.com/saiadarsh99)
