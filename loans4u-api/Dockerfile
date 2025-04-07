FROM python:3.13-rc-alpine3.20

RUN apk update && apk add rust cargo && pip install "fastapi[standard]"

COPY main.py /srv/main.py

USER 1001
WORKDIR /srv
CMD fastapi run main.py
