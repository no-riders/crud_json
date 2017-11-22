const fs = require('fs');

//add entry
let addEntry = (id, name, price) => {
    
    let entryTemplate = {
        id: '',
        name: '',
        price: ''
    }
    
    let newEntry = Object.create(entryTemplate);
    newEntry.id = id;
    newEntry.name = name;
    newEntry.price = price;
    
    let newEntryString = JSON.stringify(newEntry);
    
    if(fs.existsSync(`./data/${id}.json`)){
        return console.log(`file ${id} already exists try different name.`)
    }
    fs.writeFile(`./data/${id}.json`, newEntryString, (err) => {
        if(err) throw err;
    });

    console.log(`Entry id: ${id} and name: ${name} successfully created`)
    };

    //delete entry
    let removeEntry = (id) => {
        fs.unlink(`./data/${id}.json`, (err) => {
            if(err) {
                throw err
            }
            console.log(`file ${id} successfully deleted`);
        })
    }
    
    //edit entry
    let editEntry = (id, name, price) => {
        let obj = require(`./data/${id}.json`);
        obj.id = id || obj.id;
        obj.name = name || obj.name;
        obj.price = price || obj.price;
        fs.writeFile(`./data/${id}.json`, JSON.stringify(obj), (err) => {
            if(err) throw err;
        });
        console.log(`File id: ${id} has been updated`);
    }
    
    //view Entry
    let viewEntry = (id) => {
        fs.readFile(`./data/${id}.json`, 'utf8', (err,data) => {
            if (err) throw err;
            console.log(data);
        })
    }





    module.exports = {addEntry, removeEntry, editEntry, viewEntry};