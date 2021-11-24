'use strict';

const path = require('path');

const { readStorage, writeStorage } = require('./readerWriter.js');

const {storageFile, adapterFile} = require('./storageConfig.json');

const storageFilePath = path.join(__dirname,storageFile);

const {adapt} = require(path.join(__dirname, adapterFile));

async function getAllFromStorage(){
    return readStorage(storageFilePath);
}

async function getOneFromStorage(id){
    const storage = await readStorage(storageFilePath);
    return storage.find(item=>item.id == id) || null;
}

async function addToStorage(newObject){
    const storage = await readStorage(storageFilePath);
    storage.push(adapt(newObject));
    return await writeStorage(storageFilePath, storage);
}

async function updateStorage(updatedObject){
    const storage = await readStorage(storageFilePath);
    const oldObject = storage.find(item=>item.id == updatedObject.id);
    if(oldObject){
        Object.assign(oldObject, adapt(updatedObject)); // we use the Object constructor and we use assign method
        return await writeStorage(storageFilePath, storage);
    }
    return false;
}

async function removeFromStorage(id){
    const storage = await readStorage(storageFilePath);
    const index = storage.findIndex(item=>item.id == id);
    if (index<0) return false; // we didn't find anything
    storage.splice(index,1);//I take 1 object away starting from the position i
    return await writeStorage(storageFilePath, storage);
}

module.exports={ getAllFromStorage , getOneFromStorage , addToStorage , updateStorage , removeFromStorage }  