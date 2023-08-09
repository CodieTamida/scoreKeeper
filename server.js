const sqlite3 = require('sqlite3').verbose();

//const bodyParser = require('body-parser');
const express = require('express');

let db = new sqlite3.Database(
  './database.db',
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the database.db');
    console.log("This Prints")
  }
)

const app = express()
app.use(express.json());
app.use(express.static('./'));

app.post('/api/data', (req, res) => {
  console.log('is this running?');
  const name = req.body.name;

  //   res.json({ message: name });
  //   console.log(name);
  db.run('INSERT INTO players (name) VALUES(?)', [name], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ message: 'success', data: req.body });
    console.log('hello');
  });
});
app.get('/api/data', (req, res) => {
  res.json({ message: 'ok' });

});
const port = process.env.PORT || 5502;
app.listen(port, () => {
  console.log(`Server running on the port: ${port}`);
});
