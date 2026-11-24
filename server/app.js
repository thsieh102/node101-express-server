const path = require('node:path');
const express = require('express');
const morgan = require('morgan');
const topSpots = require('./data.json');

const app = express();

app.use(morgan('dev'));

app.get('/data', (req, res) => {
  res.json(topSpots);
});

app.use(express.static(path.join(__dirname, '..', 'public')));

module.exports = app;
