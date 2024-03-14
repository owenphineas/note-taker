let express = require('express');
const app = express();
const path = require('path');


// GET /notes returns notes.html
app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});
  
// GET * returns index.html
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'))
}); 
  
// Starts the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, function() {
  console.log(`Server listening at port ${PORT}`);
});