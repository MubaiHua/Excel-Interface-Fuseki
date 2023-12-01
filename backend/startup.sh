#!/bin/sh
python manage.py migrate
python manage.py collectstatic --no-input
gunicorn -w 3 -b 0.0.0.0:8000 --timeout 3600 --access-logfile - backend.wsgi:application