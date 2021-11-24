'use strict';

const {readStorage, writeStorage } = require('./jsonStorage/readerWriter.js');

// readStorage('./jsonStorage/employees.json').then(console.log).catch(console.log);

// writeStorage('./test.json',{a:2,b:4}).then(console.log).catch(console.log);


// readStorage('./test.json')
//     .then(data=>Object.assign(data,{c:345}))
//     .then(modified => writeStorage('./test.json', modified))
//     .then(console.log)
//     .catch(console.log);