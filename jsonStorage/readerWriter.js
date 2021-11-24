'use strict';

const fs = require('fs').promises;

async function readStorage(storageFilePath){
    try{
        const data = await fs.readFile(storageFilePath, 'utf8');
        return JSON.parse(data);
    }
    catch(error){
        // console.log(error.message); // This is for debugging the error, so we can see it in the console.
        return [];
    }
}

async function writeStorage(storageFilePath, data){
    try{
        // The null and 4 are for the space and indentation of the data
        await fs.writeFile(storageFilePath, JSON.stringify(data,null,4),{
            encoding:'utf8',
            flag:'w'
        });
        return true;
    }
    catch(error){
        // console.log(error.message); // This is for debugging the error, so we can see it in the console.
        return false;
    }
}


module.exports={readStorage, writeStorage};