const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const sqlite3 = require('sqlite3').verbose()
const morgan = require('morgan')
const path = require('path')
const port = 3000
const router = require('./server/routers/router')
const query = require('./server/routers/query')

//middleware
app.use(morgan('dev'));

//path
const dbPath = path.resolve(__dirname, 'wallet.db')

//interpreter
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//router
app.use('/', router);
// app.use('/', query);

//listener
app.listen(port, (err) => {
  if(err) { return console.error(err); }
  console.log(`Listening to ${port}...`);
});