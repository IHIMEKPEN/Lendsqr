FROM node:9-slim

#  where our application files goes to
RUN mkdir -p /app
WORKDIR /app

#  copy package.json into the app just created
COPY package.json /app
RUN npm install

# copy all files in the directory into the app
COPY . /app
CMD ["npm","start"]