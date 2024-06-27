const notes = require('express').Router();
const {v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

const {readAndAppend, readFromFile, writeToFile} = require('../helper/fsUtils');
const { title } = require('process');



//GET Route for retrieving notes
notes.get('/', (res, req) =>{
    readFromFile(path.join(__dirname,'../db/db.json')).then((data) => res.json(JSON.parse(data)));
});


//POST Route for submitting
notes.post('./', (res, req) =>{
    const {title, text} = req.body;

    if(title && text) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

    readAndAppend(newNote, path.join(__dirname, '../db/db.json'));

    res.json('Note was added!');
    }else {
    res.errored('Error in adding note');
    }
});

//Deleting notes
notes.delete('/:id', (res, req) => {
    const noteId = req.params.id;
    readFromFile(path.join(__dirname, '../db/db.json')).then((data) => {
        const notes = JSON.parse(data);
        const updateNotes = notes.filter((notes) => noteId.id !== noteId);

    writeToFile(path.join(__dirname, '../db/db.json'), updateNotes);
        res.json('Note with ID ${noteId} deleted');
    });
});

module.exports = notes;