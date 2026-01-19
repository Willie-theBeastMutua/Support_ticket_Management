// src/app.js
const express = require('express');
const routes = require('./routes');
const errorHandler = require('./middlewares/error.middleware');

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use('/api/v1', routes);
app.use(errorHandler);

module.exports = app;
