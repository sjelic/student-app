FROM python

# set work directory
WORKDIR /usr/src/01_vezbe_uvod

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install dependencies
RUN pip install --upgrade pip
RUN apt update
RUN apt install nodejs npm -y
COPY ./requirements.txt /usr/src/01_vezbe_uvod/.
RUN pip install -r requirements.txt
