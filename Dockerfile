# FROM node:latest

# WORKDIR /arkham-api

# COPY package.json ./
# COPY package-lock.json ./
# COPY ./ ./

# RUN npm i

# CMD ["node", "index.js"]
####
# FROM node:latest

# WORKDIR /arkham-ui

# # COPY . /arkham-ui
# VOLUME $(pwd):/arkham-ui

# EXPOSE 6969



FROM node:14-alpine

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

# RUN npm install

EXPOSE 6969


CMD [ "npm", "start"]