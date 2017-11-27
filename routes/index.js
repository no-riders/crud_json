const express = require('express');
const app = express();
const entries = require('../entries');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// let sortedData = dataFromJSON.sort((a,b) => {
//     return parseInt(a.id) - parseInt(b.id);
// })

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
            throw Error(err);
        }
        res.redirect('/');
    });
})

app.post('/delete', (req, res) => {
    let id = req.body.del;
    entries.removeEntry(id);
    res.redirect('/');
})

app.post('/update', (req, res) => {
    const oldId = req.body.old_id;
    const id = req.body.new_id || req.body.old_id;
    const name = req.body.edit_name;
    const price = req.body.edit_price;

    entries.editEntry(oldId, { id, name, price }, (err) => {
        if (err) {
            req.flash('error', 'Item exists');
        }
        res.redirect('/');
    });
})


module.exports = app;