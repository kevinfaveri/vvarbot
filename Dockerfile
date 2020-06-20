FROM node:latest

ENV HOME=/home/app
COPY package.json $HOME/vvarbot/
WORKDIR $HOME/vvarbot
ENV NODE_PATH=/home/node_modules
VOLUME $NODE_PATH

CMD yarn dev
