const display = require('./data/data.json');


const dataFromJSON = display.data;
const sortedData = dataFromJSON.sort((a, b) => {
    return parseInt(a.id) - parseInt(b.id);
})

module.exports = sortedData;