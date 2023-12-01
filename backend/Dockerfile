FROM python:3.12-alpine
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
WORKDIR /backend
RUN pip install --upgrade pip
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
COPY . .
CMD sh -c "python manage.py makemigrations && \
           python manage.py migrate && \
           python manage.py collectstatic --no-input && \
           gunicorn -w 3 -b 0.0.0.0:8000 --timeout 3600 --access-logfile - backend.wsgi:application"