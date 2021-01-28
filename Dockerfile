# select node with alpine as base
FROM node:alpine

# switch current working dir
WORKDIR /app

# copy package.json and install the required dependencies
COPY package.json .
RUN npm install

# copy rest of the source files
COPY . .

# startup command
CMD ["npm", "start"]
