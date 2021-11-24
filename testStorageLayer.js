'use strict';

const {getAllFromStorage, getOneFromStorage, addToStorage, updateStorage, removeFromStorage} = require('./jsonStorage/storageLayer.js');

// getAllFromStorage().then(console.log).catch(console.log);

// getOneFromStorage(2).then(console.log).catch(console.log);

// const newEmployee = {
//     "id": "3",
//     "firstname": "Abel",
//     "lastname": "Parada",
//     "department": "Chef",
//     "salary": "5000"
//   }

// addToStorage(newEmployee).then(console.log).catch(console.log);


const newEmployeeUpdated = {
    "id": 3,
    "firstname": "Vera",
    "lastname": "River",
    "department": "admin",
    "salary": "8000"
  }

updateStorage(newEmployeeUpdated).then(console.log).catch(console.log);

// removeFromStorage(3).then(console.log).catch(console.log);

