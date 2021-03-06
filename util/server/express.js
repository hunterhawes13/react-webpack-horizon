'use strict'

const url = require('url');
const path = require('path');
const express = require('express');
const horizon = require('@horizon/server');

const app = express();

app.use(express.static(path.resolve(__dirname + '/../../public')));

app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname + '/../../public/index.html'));
});
const httpServer = app.listen(process.env.PORT);

if(!process.env.RETHINKDB_URL) {
  throw 'RETHINKDB_URL environment variable must be defined.'
}

var urlRethinkDB = url.parse(process.env.RETHINKDB_URL);

const options = {
  auth: {
    token_secret: 'my_super_secret_secret',
    allow_anonymous: true,
    allow_unauthenticated: true
  },
  permissions: false,
  project_name: 'react_webpack_horizon',
  rdb_host: urlRethinkDB.hostname,
  rdb_port: urlRethinkDB.port
};
console.log('starting horizon with ' + options);
const horizonServer = horizon(httpServer, options);

console.log('Listening on port ' + process.env.PORT);
