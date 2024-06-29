const express = require('express');


//import routers for notes
const notesRouter = require('./notes.js');

const app = express();

app.use('./notes.js', notesRouter);

module.exports = app;