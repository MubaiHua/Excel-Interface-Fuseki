#!/bin/sh
# Not used right now
# Make any pending migrations (Should be run before pushing code to github)
# python3 manage.py makemigrations

# Migrate database
echo "Apply database migrations"
python3 manage.py migrate

# Collect static files
echo "Collect static files"
python3 manage.py collectstatic --no-input
