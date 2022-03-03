FROM node:16.13.1-bullseye

RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

WORKDIR /home/node/app

USER node

COPY --chown=node:node . .

RUN npm install


EXPOSE 8081


CMD [ "npm", "run", "start" ]