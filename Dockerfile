FROM mhart/alpine-node:8

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install -g npm@5.6.0


# Bundle app source
COPY . .

EXPOSE 4000
CMD [ "npm", "start" ]