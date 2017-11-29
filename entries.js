const fs = require("fs");
const path = require('path');

const DATA_FILEPATH = './data/data.json';


function getData() {
  return JSON.parse(fs.readFileSync(DATA_FILEPATH, "utf-8"));
}

function saveData(data) {
  fs.writeFileSync(DATA_FILEPATH, JSON.stringify(data, null, 2));
}

function findItemById(collection, id) {
  return collection.find((item) => item.id === id);
}

//add:
function addEntry(data, cb) {
  if (!data) {
    return null;
  }

  const collection = [...getData()];
  const existingItem = findItemById(collection, data.id);

  if (existingItem) {
    return cb("Error, ID is taken");
  }
  collection.push(data);
  collection.sort((a,b) => a.id - b.id)
  
  saveData(collection);

  cb();
}

//delete:
function removeEntry(id,cb) {
  const collection = [...getData()];
  const existingItem = findItemById(collection,id);
  if (!existingItem) {
    cb('Error, no item found!')
  }
  const filteredCollection = collection.filter(item => item.id !== id);

  saveData(filteredCollection);
}

//edit:
function editEntry (entryId, newData, cb) {
  if (entryId === newData.id) {
    return cb('existing id');
  }

  const data = {
    id: newData.id,
  };
  if (newData.name) {
    data.name = newData.name;
  }
  if (newData.price) {
    data.price = newData.price;
  }

  const entriesData = getData() || [];

  const editedCollection = entriesData.map(item => {
    if (item.id !== entryId) {
      return item;
    }
    return Object.assign({}, item, data);
  });
  editedCollection.sort((a,b) => a.id - b.id);
  saveData(editedCollection);

  cb();
};

module.exports = {
  getData,
  addEntry,
  removeEntry,
  editEntry
};
