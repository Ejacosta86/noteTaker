const express = require('express').Router();


//import routers for notes
const notesRouter = require('./notes');

router.use('/notes', notesRouter);

module.exports = router;