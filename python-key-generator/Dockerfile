FROM --platform=linux/amd64 python:alpine

RUN apk --no-cache add g++ make libffi-dev

RUN pip install pynacl base58

RUN mkdir /app
COPY *.py /app

CMD [ "python3", "/app/generate.py" ]
