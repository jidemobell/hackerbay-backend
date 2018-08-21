const env = process.env.NODE_ENV;
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/index');

const app = express();

if (env === 'test') {
  mongoose.connect('mongodb://localhost/hackerbaytest', { useNewUrlParser: true });
}
mongoose.connect('mongodb://localhost/hackerbay', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', routes);

app.listen(4000);


module.exports = app;
