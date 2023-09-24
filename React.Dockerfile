FROM node:18.16.1

WORKDIR /frontend-template/

COPY food-ordering-frontend/public/ /frontend-template/public
COPY food-ordering-frontend/src/ /frontend-template/src
COPY food-ordering-frontend/package.json /frontend-template/

RUN npm install

CMD ["npm", "start"]