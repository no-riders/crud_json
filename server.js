const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');


const entries = require('./entries');

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listening on ' + port));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/views'));

app.get('/', (req, res) => {
    res.render('index');
})

app.post('/submit', (req, res) => {
    let id = req.body.id;
    let name = req.body.name;
    let price = req.body.price;
    entries.addEntry(id, name, price);
    res.redirect('/')
})

app.post('/delete', (req, res) => {
    let id = req.body.del;
    entries.removeEntry(id);
    res.redirect('/');
})

app.post('/update', (req, res) => {
    let id = req.body.edit_id;
    let name = req.body.edit_name;
    let price = req.body.edit_price;
    entries.editEntry(id, name, price);
    res.redirect('/');
})

app.post('/view', (req, res) => {
    let id = req.body.view;
    entries.viewEntry(id);
    res.redirect('/');
})