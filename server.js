const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan')

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
app.use(express.static('frontend/'));
app.use(morgan('dev'));
app.use(express.json());
app.use(cors())

app.delete('/deleteList', (req, res) => {
  db.run('DELETE FROM player', [], (err, changes) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ message: 'success', data: req.body });
  })
})

app.delete('/delete/player/:id', (req, res) => {
  const playerId = req.params.id;

  db.run('DELETE FROM player WHERE id = ?', [playerId], (err, changes) => {
    if (err) {
      return res.status(400).json({ error: err.emesage});
    }
    res.json({ message: 'success', data: req.body })
  })
})

app.post('/api/rules', (req, res) => {
  //const param = req.body.param;
  const parameter = req.body.parameter;
  const score = req.body.score;
  //console.log(param);
  console.log(parameter);
  db.run('INSERT INTO rules (parameter, score) VALUES (?, ?)', [parameter, score], (err) => {
    if (err) {
      return res.status(400).json({ error: err.body });
    }
    res.json({ message: 'success', data: req.body });
  })
})

app.post('/api/data', (req, res) => {
  console.log('is this running?');
  const firstname = req.body.firstname;
  const lastname = req.body.lastname
  /*
  db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS players (name TEXT Primary KEY")
  });
  */
  db.run('INSERT INTO player (firstname, lastname) VALUES(?, ?)', [firstname, lastname], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ message: 'success', data: req.body });
    console.log('hello');
  });
  //db.close();
})


app.get('/getPlayers', (req, res) => {
  const query = "SELECT * FROM player";
  db.all(query, [], (err, rows) => {
    if (err) {
      console.log(error(err.message));
      res.status(500).send("Error feteching data");
    }
    res.json(rows);
  });


/*
app.delete(`/getPlayers/${id}`, (req, res) => {
  db
})
*/
 // db.close();
})
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server running on the port: ${port}`);
});

