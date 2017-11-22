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
    let editEntry = (old_id, new_id, name, price) => {
        let obj = require(`./data/${old_id}.json`);
        if(new_id) {
            obj.id = new_id;
        } else {
            obj.id = old_id;
        }
        obj.name = name || obj.name;
        obj.price = price || obj.price;
        fs.writeFile(`./data/${old_id}.json`, JSON.stringify(obj), (err) => {
            if(err) throw err;
        });
        if(new_id) {
            fs.rename(`./data/${old_id}.json`, `./data/${new_id}.json`, (err) => {
                if(err) throw err;
            })
            console.log(`File id: ${old_id} renamed to file id: ${new_id}`)
        }
        console.log(`File id: ${old_id} has been updated`);
    }
    
    //view Entry
    let viewEntry = (id) => {
        fs.readFile(`./data/${id}.json`, 'utf8', (err,data) => {
            if (err) throw err;
            console.log(data);
        })
    }





    module.exports = {addEntry, removeEntry, editEntry, viewEntry};