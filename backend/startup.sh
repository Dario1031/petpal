#!/bin/sh
virtualenv petpal/venv
source petpal/venv/bin/activate
pip3 install -r requirements.txt
python3 petpal/manage.py makemigrations
python3 petpal/manage.py migrate
deactivate
