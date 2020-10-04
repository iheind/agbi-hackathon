# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from app.home import blueprint
from app.home.messaging import send_sms
from flask import render_template, redirect, url_for, request
from flask_login import login_required, current_user
from app import login_manager
from jinja2 import TemplateNotFound, Environment
import pyrebase
import json
from app.home.mail import bulkMailer

def environment(**options):
    env = Environment(**options, extensions=['jinja2.ext.loopcontrols'])
    env.globals.update({
        'static': static,
        'url': reverse,
    })
    return env

# Temporarily replace quote function
def noquote(s):
    return s
pyrebase.pyrebase.quote = noquote

# Database
# FIREBASE VARIABLES
auth=db=user=firebase=None
# FIREBASE CONNECTION CONFIGURATION
config = {
    "apiKey": "AIzaSyA_rPzl1D8YouEsSJ1AjQwElFqH_mxOAFI",
    "authDomain": "realtime-4a7de.firebaseapp.com",
    "databaseURL": "https://realtime-4a7de.firebaseio.com",
    "projectId": "realtime-4a7de",
    "storageBucket": "realtime-4a7de.appspot.com",
    "messagingSenderId": "624733681109",
    "appId": "1:624733681109:web:e26d8881c0194973d6b95c",
    "measurementId": "G-01BBL7B415",
    "serviceAccount": "credentials/serviceAccountCredentials.json"
}
# INITIALISE FIREBASE CONNECTION
firebase = pyrebase.initialize_app(config)
auth = firebase.auth()
db = firebase.database()

@blueprint.route('/index')
@login_required
def index():
    defaultData = db.child("patients").child("records").get().val()
    crampedData = {}
    x = 0
    for i in defaultData:
        print("here", i)
        if x == 7:
            break
        else:
            crampedData[i] = defaultData[i]
        x += 1
    return render_template('index.html', segment='index', defaultData = crampedData)

@blueprint.route('/patient_profile/<data>')
@login_required
def patient_profile(data):
    defaultData = db.child("patients").child("records").get().val()
    data = defaultData[data]
    return render_template('patient_profile.html', data = data)

@blueprint.route('/send_notification')
@login_required
def send_notification():
    defaultData = db.child("drugs").child("records").get().val()
    patientData = db.child("patients").child("records").get().val()
    return render_template('send_notification.html', segment='send_notification', defaultData = defaultData, patientData = patientData, data = "")


@blueprint.route('/send_notification_sms', methods=['GET', 'POST'])
@login_required
def send_notification_sms():
    sms = request.form['sms']
    sms = ",".join([i[1:] if len(i) > 10 else i for i in sms.split(',')])
    email = [[x, x, '#'] for x in request.form['email'].split(',')]
    drug = request.form['drug']
    try:
        bulkMailer(email, drug)
    except Exception as e:
        pass
    message = "Glad to inform you that, a new medicine " + drug + " has arrived at our Store. Please feel free to visit our doctors and get a prescription to take the new drug on the store. Order now on netmeds https://www.netmeds.com/catalogsearch/result?q=" + drug
    message = message.replace(" ", "%20")
    result = send_sms(sms, message)
    print(sms, email)
    flag = "sent"
    defaultData = db.child("patients").child("records").get().val()
    crampedData = {}
    x = 0
    for i in defaultData:
        print("here", i)
        if x == 7:
            break
        else:
            crampedData[i] = defaultData[i]
        x += 1
    return render_template('index.html', segment='index', defaultData = crampedData, flag = flag)

@blueprint.route('/send_notification_list/<name_treatment_complications>')
@login_required
def send_notification_list(name_treatment_complications):
    defaultData = db.child("drugs").child("records").get().val()
    patientData = db.child("patients").child("records").get().val()
    name, treatment, complications = name_treatment_complications.split('_')
    data = {
        'name': name,
        'treatment': treatment.split(', '),
        'complications': complications.split(', ')
    }
    return render_template('send_notification.html', segment='send_notification', defaultData = defaultData, patientData = patientData, data = data)

@blueprint.route('/drugs_list')
@login_required
def drugs_list():
    defaultData = db.child("drugs").child("records").get().val()
    return render_template('ui-tables-drugs.html', segment='drugs_list', defaultData = defaultData, buttonText = "Add drug", route = "drugforms")

@blueprint.route('/patients_list')
@login_required
def patients_list():
    defaultData = db.child("patients").child("records").get().val()
    return render_template('ui-tables.html',  segment='patients_list', defaultData = defaultData, buttonText = "Add patient", route = "forms")

@blueprint.route("/add_patient", methods=['GET', 'POST'])
@login_required
def add_patient():
    firstname = request.form['firstname']
    lastname = request.form['lastname']
    name = firstname + " " + lastname
    address = request.form['address']
    city = request.form['city']
    country = request.form['country']
    phonenumber = request.form['phonenumber']
    email = request.form['email']
    zipcode = request.form['zipcode']
    complications = request.form['complications']
    diagnosis = request.form['diagnosis']
    medications = request.form['medications']
    gender = request.form['gender']
    age = request.form['age']
    data = {
        'name': name,
        'address': address,
        'city': city,
        'country': country,
        'zipcode': zipcode,
        'phonenumber': phonenumber,
        'email': email,
        'complications': complications,
        'diagnosis': diagnosis.lower(),
        'medications': medications.lower(),
        'gender': gender,
        'age': age,
    }
    db.child("patients").child("records").push(data)
    return redirect(url_for('home_blueprint.patients_list'))

@blueprint.route("/add_drug", methods=['GET', 'POST'])
@login_required
def add_drug():
    name = request.form['name']
    treatment = request.form['treatment']
    complications = request.form['complications']
    overdose = request.form['overdose']
    sideeffects = request.form['sideeffects']
    cautions = request.form['cautions']

    data = {
        'name': name,
        'treatment': treatment.lower(),
        'complications': complications.lower(),
        'overdose': overdose.lower(),
        'sideeffects': sideeffects.lower(),
        'cautions': cautions.lower(),
    }
    db.child("drugs").child("records").push(data)
    return redirect(url_for('home_blueprint.drugs_list'))

@blueprint.route('/<template>')
@login_required
def route_template(template):

    try:

        if not template.endswith( '.html' ):
            template += '.html'

        # Detect the current page
        segment = get_segment( request )

        # Serve the file (if exists) from app/templates/FILE.html
        return render_template( template, segment=segment )

    except TemplateNotFound:
        return render_template('page-404.html'), 404

    except:
        return render_template('page-500.html'), 500

# Helper - Extract current page name from request
def get_segment( request ):

    try:

        segment = request.path.split('/')[-1]

        if segment == '':
            segment = 'index'

        return segment

    except:
        return None
