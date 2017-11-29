const express = require('express');
const app = express();
const entries = require('../entries');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');


const { getData } = require('../entries')


app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render("index", {
      title: "CRUD JSON",
      items: getData(),
      sessionFlash: req.session.flash
    });
})

app.post('/', (req, res) => {
    const { id, name, price } = req.body;
    const data = { id, name, price };
    
    entries.addEntry(data, (err) => {
        if (err) {
            req.flash('error', `Create error: Item with ID ${data.id} already exists.`)
        }
        res.redirect('/');
    });
})

app.post('/delete', (req, res) => {
    let id = req.body.del;
    entries.removeEntry(id, (err) => {
        if(err) {
            req.flash('error', `Delete error: Unable to delete item. ID ${id} does not exist.`)
        }
    });
    res.redirect('/');
})

app.post('/update', (req, res) => {
    const oldId = req.body.old_id;
    const id = req.body.new_id || req.body.old_id;
    const name = req.body.edit_name;
    const price = req.body.edit_price;
    const data = { id, name, price };

    entries.editEntry(oldId, data, (err) => {
        if (err) {
            req.flash('error', `Update error: Item ID ${data.id} already exists.`);
        }
        res.redirect('/');
    });
})


module.exports = app;