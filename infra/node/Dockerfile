FROM node:16.3.0-alpine

WORKDIR /work

RUN npm install -g @vue/cli

COPY ./scripts/docker.start.sh /scripts/start.sh

RUN chmod +x /scripts/*

ENTRYPOINT [ "/scripts/start.sh" ]