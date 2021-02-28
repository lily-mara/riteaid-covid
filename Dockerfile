FROM python:3.8-slim

EXPOSE 80

RUN pip install pipenv

COPY Pipfile Pipfile.lock ./

RUN pipenv install

COPY app.py .

ENTRYPOINT [ "pipenv", "run", "./app.py" ]
