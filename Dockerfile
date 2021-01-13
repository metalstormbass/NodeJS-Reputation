#Dockerfile
FROM node:14

RUN mkdir /NodeJS-Reputation
COPY . ./NodeJS-Reputation

WORKDIR /NodeJS-Reputation

RUN npm install

EXPOSE 3000
CMD["node", "bin/www.js"]