const DBClient = require('./api/lib/DBClient');
const JSONValidator = require('./api/lib/JSONValidator');

const dbInstance = new DBClient('menus');
const jsonValidator = new JSONValidator();

/*
let menuEntry = {
    "restaurant": {
    "name": "test",
    "address": "test",
    "city": "test"
    },
    "ocr": []
    }
*/

let menuEntry = {}

try {
    jsonValidator.sanitize(menuEntry, 'menus');
} catch(err) {
    console.log(err.message);
}

dbInstance.insert(menuEntry).then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err.message);
})
