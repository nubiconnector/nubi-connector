FROM node:alpine
RUN apk update && \
    apk add --update git && \
    apk add --update openssh
RUN mkdir -p /app
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
# RUN npm run build
EXPOSE 4000
CMD ["npm", "run", "start:stage"]