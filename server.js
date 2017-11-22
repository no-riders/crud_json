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
    let old_id = req.body.old_id;
    let new_id = req.body.new_id;
    let name = req.body.edit_name;
    let price = req.body.edit_price;
    entries.editEntry(old_id, new_id, name, price);
    res.redirect('/');
})

app.post('/view', (req, res) => {
    let id = req.body.view;
    entries.viewEntry(id);
    res.redirect('/');
})