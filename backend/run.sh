#!/bin/sh
source petpal/venv/bin/activate
chmod +x ./petpal/manage.py
python3 ./petpal/manage.py runserver
