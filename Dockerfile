FROM node:6.0.0
RUN mkdir /src

WORKDIR /src
ADD . /src
RUN npm install

EXPOSE 8000

CMD npm run test
CMD npm run start
