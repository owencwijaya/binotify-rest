FROM node:17-alpine
WORKDIR /app
COPY package*.json ./

RUN npm install
RUN apk update && apk add bash
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]