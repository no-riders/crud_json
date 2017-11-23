const fs = require('fs');

//add entry
let addEntry = (id, name, price) => {
    let entryTemplate = {
        id,
        name,
        price
    }

    let newEntry = Object.create(entryTemplate);
    newEntry.id = id;
    newEntry.name = name;
    newEntry.price = price;

    let newEntryString = JSON.stringify(newEntry);

    //get data file
    let obj = require('./data/data.json');
    //grab array of objects
    let objData = obj.data;
    //grab id's from objects, check if id from newly added obj is already inside data file
    let allids = objData.map(obj => obj.id);
    let currentObj = JSON.parse(newEntryString);

    if (allids.indexOf(currentObj.id) > -1) {
        console.log('Error, ID is taken')
    } else {
        objData.push(currentObj);

        fs.writeFile(`./data/data.json`, JSON.stringify(obj, null, 2), (err) => {
            if (err) throw err;
        });
        console.log(`Entry id: ${id} and name: ${name} successfully created`)
    };
}

//delete entry
let removeEntry = (id) => {
    let obj = require('./data/data.json');
    let objData = obj.data;
    let allids = objData.map(obj => obj.id);
    // console.log(objData)
    // console.log(allids);
    // console.log(allids.indexOf(id));

function removeValue(arr, value) {
    arr.forEach((item) => {
        if(arr.indexOf(item) === value) {
            arr.splice(arr.indexOf(item), 1)
        }
    })
    //console.log(arr)
    return arr;
}
removeValue(objData, allids.indexOf(id))
fs.writeFile('./data/data.json', JSON.stringify(obj, null, 2), (err) => {
    if(err) throw err;
});
console.log(`Entry with id: ${id} has been removed`);
}

//edit entry
let editEntry = (old_id, new_id, name, price) => {
    let obj = require(`./data/${old_id}.json`);
    //wether new id has been provided or not
    if (new_id) {
        obj.id = new_id;
    } else {
        obj.id = old_id;
    }

    obj.name = name || obj.name;
    obj.price = price || obj.price;

    //update file 
    fs.writeFile(`./data/data.json`, JSON.stringify(obj), (err) => {
        if (err) throw err;
    });
    //if new id provided - rename json file
    //     if (new_id) {
    //         fs.rename(`./data/${old_id}.json`, `./data/${new_id}.json`, (err) => {
    //             if (err) throw err;
    //         })
    //         console.log(`File id: ${old_id} renamed to file id: ${new_id}`)
    //     }
    //     console.log(`File id: ${old_id} has been updated`);
}

//view Entry
let viewEntry = (id) => {
    fs.readFile(`./data/${id}.json`, 'utf8', (err, data) => {
        if (err) throw err;
        console.log(data);
    })
}


module.exports = {
    addEntry,
    removeEntry,
    editEntry,
    viewEntry
};