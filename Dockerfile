FROM node:12.18.4
RUN mkdir /app
COPY ./package.json /app/
COPY package-lock.json /app/
RUN npm install
WORKDIR /app
