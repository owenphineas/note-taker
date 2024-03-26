let express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// GET /notes returns notes.html
app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});
  
// GET * returns index.html
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

// GET /api/notes reads db.json and returns saved notes as JSON
app.get('/api/notes', function(req, res) {
  fs.readFile('./db/db.json', function(err, notes) {
    const noteData = JSON.parse(notes);
    if(err) {
      console.err(err)
    } else {
      res.json(noteData)
    }
  })
});

app.post('/api/notes', function(req, res) {
  const newNote = req.body;
  console.log(newNote);
  if(newNote.title && newNote.text) {
    fs.readFile('./db/db.json', function(err, data) {
      if(err) {
        console.err(err)
      } else {
        console.log(JSON.parse(data));
        const dbData = JSON.parse(data);
        dbData.push(newNote);
        console.log(dbData);
          fs.writeFile('./db/db.json', JSON.stringify(dbData), function(err) {
      if (err) throw err;
      console.log('Note appended to file.')
     res.json(`Note with title ${data.title} added successfully.`);
  });
      }
      })
    }
})

  
// Starts the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, function() {
  console.log(`App listening at port ${PORT}`);
});