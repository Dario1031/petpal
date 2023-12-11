#!/bin/sh
source petpal/venv/bin/activate
python3 ./petpal/manage.py runserver 127.0.0.1:8000
