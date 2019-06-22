FROM node:10.16-alpine
ADD . /src
WORKDIR /src/upload
RUN npm install
CMD ["npm", "test"]

