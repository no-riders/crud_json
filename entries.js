const fs = require("fs");
const obj = require("./data/data.json");

function saveEntryRecord (file, data) {
  //sort new arr of objs by id
  // let collectionSorted = collection.sort((a, b) => {
    //   return parseInt(a.id) - parseInt(b.id);
    // });
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

function addEntry (id, name, price, cb) {
  if (!id || !name || !price) { return null; }
  
  const newEntry = Object.assign({}, {
    id,
    name,
    price,
  });
  
  //grab array of objects (collection)
  const collection = [...obj.data];
  const idExists = collection.find(({ id }) => id === newEntry.id)
  
  if (idExists) {
    cb("Error, ID is taken");
  }
  
  collection.push(newEntry);

  console.log(saveEntryRecord)
  // saveEntryRecord('./data/data.json', { data: collection });

  cb(null, newEntry);

  // if (allIds.indexOf(newEntry.id) > -1) {
  //   console.log("Error, ID is taken");
  // } else {
  //   collection.push(newEntry);
  //   //sort new arr of objs by id
  //   let collectionSorted = collection.sort((a, b) => {
  //     return parseInt(a.id) - parseInt(b.id);
  //   });
  //   fs.writeFile(`./data/data.json`, JSON.stringify(obj, null, 2), err => {
  //     if (err) throw err;
  //   });
  //   console.log(`Entry id: ${id} and name: ${name} successfully created`);
  // }

  // return collection[collection.length-1]
};

//delete entry
let removeEntry = id => {
  let obj = require("./data/data.json");
  let objData = obj.data;
  let allids = objData.map(obj => obj.id);
  //get index of requested id and remove from existing object
  function removeEntry(arr, value) {
    arr.forEach(item => {
      if (arr.indexOf(item) === value) {
        arr.splice(arr.indexOf(item), 1);
      }
    });
    return arr;
  }
  removeEntry(objData, allids.indexOf(id));
  //write updated object back to data file
  fs.writeFile("./data/data.json", JSON.stringify(obj, null, 2), err => {
    if (err) throw err;
  });
  console.log(`Entry with id: ${id} has been removed`);
};

//edit entry
let editEntry = (old_id, new_id, name, price) => {
  let obj = require("./data/data.json");
  let objData = obj.data;
  let allids = objData.map(obj => obj.id);

  //get index of requested id and update from existing object
  function updateEntry(arr, value) {
    arr.forEach(item => {
      if (arr.indexOf(item) === value) {
        let entry = arr[arr.indexOf(item)];
        //check if new id supplied then update id
        if (new_id) {
          entry.id = new_id;
        }
        entry.name = name || entry.name;
        entry.price = price || entry.price;
        console.log(arr[arr.indexOf(item)]);
      }
    });
    return arr;
  }
  updateEntry(objData, allids.indexOf(old_id));
  //sort:
  let objDataSorted = objData.sort((a, b) => {
    return parseInt(a.id) - parseInt(b.id);
  });
  //write new data
  fs.writeFile("./data/data.json", JSON.stringify(obj, null, 2), err => {
    if (err) throw err;
  });
};

// //view Entry bi id
// let viewEntry = id => {
//   let obj = require("./data/data.json");
//   let objData = obj.data;
//   let allids = objData.map(obj => obj.id);

//   //get index of requested id and display from existing object
//   function viewEntry(arr, value) {
//     arr.forEach(item => {
//       if (arr.indexOf(item) === value) {
//         console.log(arr[arr.indexOf(item)]);
//       }
//     });
//     return arr;
//   }
//   viewEntry(objData, allids.indexOf(id));
// };

module.exports = {
  saveEntryRecord,
  addEntry,
  removeEntry,
  editEntry,
  //viewEntry
};
