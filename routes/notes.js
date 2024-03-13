const notes = require('express').Router();
const {readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// utilizes the get fetch in front end so that notes can be displayed from data base
notes.get('/', (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
  
});

// utilizes the post fetch in front end so that users can post notes
notes.post('/', (req, res) => {
  console.info(`${req.method} request received for notes`);
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(newNote, './db/db.json');

    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
  } else {
    res.json('Error in posting note');
  }
  
});

module.exports = notes