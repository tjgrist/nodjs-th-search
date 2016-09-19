"use strict"
var router = require('./router.js');
const http = require('http');

const port = process.env.PORT || 3000;

const server = http.createServer((request, response) => {
  router.home(request, response);
  router.user(request, response);
});

server.listen(port, () => {
  console.log(`Server running at port ` + port);
});

