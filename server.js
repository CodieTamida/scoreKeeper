
const sqlite3 = require('sqlite3').verbose();

const bodyParser = require('body-parser');
const express = require('express');

const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser);


let db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the database.db');
})
/*
app.get('/init-db', (req, res) => {
    db.run('Create Table players(name)', [], (err) => {
        if (err) {
            res.send(500).json({ error: err.message });
        }
        res.json({ message: "table created!" });
    })
})
*/
app.get('/api/data', (req, res) => {
    console.log("is this running?")
    const name = req.body.name;
    console.log(name);
    db.run('INSERT INTO players (name) VALUES(?)', [name], function (err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ message: 'success', data:req.body });
        console.log('hello');
    });
});

const port = process.env.PORT || 5500;
app.listen(port, () => {
    console.log(`Server running on the port: ${port}`);
});

/*
app.post('/api/data', (req, res) => {
    console.log("is this running?")
    const name = req.body.name;

    db.run('INSERT INTO players (name) VALUES(?)', [name], function (err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ message: 'success', data:req.body });
        console.log('hello');
    });
});
*//*
db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Closed the database connection!')
});
*/
