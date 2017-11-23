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
    //get index of requested id and remove from existing object
    function removeEntry(arr, value) {
        arr.forEach((item) => {
            if (arr.indexOf(item) === value) {
                arr.splice(arr.indexOf(item), 1)
            }
        })
        return arr;
    }
    removeEntry(objData, allids.indexOf(id))
    //write updated object back to data file
    fs.writeFile('./data/data.json', JSON.stringify(obj, null, 2), (err) => {
        if (err) throw err;
    });
    console.log(`Entry with id: ${id} has been removed`);
}

//edit entry
let editEntry = (old_id, new_id, name, price) => {
    let obj = require('./data/data.json');
    let objData = obj.data;
    let allids = objData.map(obj => obj.id);

    //get index of requested id and update from existing object
    function updateEntry(arr, value) {
        arr.forEach((item) => {
            if (arr.indexOf(item) === value) {
                let entry = arr[arr.indexOf(item)]
                //check if new id supplied then update id
                if(new_id) {
                    entry.id = new_id;
                }
                entry.name = name || entry.name;
                entry.price = price || entry.price;
                console.log(arr[arr.indexOf(item)])
            }
        })
        return arr;
    }
    updateEntry(objData, allids.indexOf(old_id));
    //write new data
    fs.writeFile('./data/data.json', JSON.stringify(obj, null, 2), (err) => {
        if (err) throw err;
    });
}

//view Entry bi id
let viewEntry = (id) => {
    let obj = require('./data/data.json');
    let objData = obj.data;
    let allids = objData.map(obj => obj.id);

    //get index of requested id and display from existing object
    function viewEntry(arr, value) {
        arr.forEach((item) => {
            if (arr.indexOf(item) === value) {
                console.log(arr[arr.indexOf(item)])
            }
        })
        return arr;
    }
    viewEntry(objData, allids.indexOf(id));
}


module.exports = {
    addEntry,
    removeEntry,
    editEntry,
    viewEntry
};