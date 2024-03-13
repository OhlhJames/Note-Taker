const express = require('express');
const path = require('path')
const PORT = process.env.PORT || 3001;
const app = express()
const api = require('./routes/index');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api', api)

// serves home page when users request an empty navigation
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// serves notes page when users request a notes navigation
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// listens for if the server is running and informs user of port it is running on as well as providing a link to users
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
