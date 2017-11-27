const express = require('express');
const app = express();
const entries = require('../entries');
//const getJSON = require('../public/getJSON');
const bodyParser = require('body-parser');
const display = require('../data/data.json');
const fs = require('fs')

let dataFromJSON = display.data;
let sortedData = dataFromJSON.sort((a,b) => {
    return parseInt(a.id) - parseInt(b.id);
})


app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('index', {title: 'CRUD JSON', items: sortedData});
})

app.post('/submit', (req, res) => {
    const { id, name, price } = req.body;
    
    entries.addEntry(id, name, price, (err) => {
        if (error) {
            throw Error(error);
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
    let old_id = req.body.old_id;
    let new_id = req.body.new_id;
    let name = req.body.edit_name;
    let price = req.body.edit_price;
    entries.editEntry(old_id, new_id, name, price);
    res.redirect('/');
})

// app.post('/view', (req, res) => {
//     let id = req.body.view;
//     entries.viewEntry(id);
//     res.redirect('/');
// })


module.exports = app;