FROM node:latest

RUN sed -e 's/$/ contrib non-free/' -i /etc/apt/sources.list
RUN apt-get update
RUN apt-get install -y \
	graphicsmagick

EXPOSE 8000:8000

COPY . /app

WORKDIR /app

RUN npm install
RUN npm build

CMD npm start

