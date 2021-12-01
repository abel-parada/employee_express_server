'use strict';

const { resolveInclude } = require('ejs');
const {CODES, MESSAGES} = require('./statusCodes.js')

const { getAllFromStorage , getOneFromStorage , addToStorage , updateStorage , removeFromStorage } = require('./storageLayer.js');

// Datastorage class. We define it and export it right away

module.exports = class Datastorage{

    get CODES(){
        return CODES;
    }; //getter ends here

    getAll(){
        return getAllFromStorage();
    }; //getAll ends here

    getOne(id){
        return new Promise(async (resolve, reject)=>{
            if(!id){
                reject(MESSAGES.NOT_FOUND('--empty--'));
            }
            else {
                const result = await getOneFromStorage(id);
                if (result){
                    resolve(result);
                }
                else{
                    reject(MESSAGES.NOT_FOUND(id));
                }
            }
        })
    }; //getOne ends here

    insert(employee){
        return new Promise(async (resolve, reject) =>{
            if(employee){
                if(!employee.id){
                    reject(MESSAGES.NOT_INSERTED);
                }
                else if (await getOneFromStorage(employee.id)){
                    reject(MESSAGES.ALREADY_IN_USE(employee.id));
                }
                else if (await addToStorage(employee)){
                    resolve(MESSAGES.INSERT_OK(employee.id));
                }
                else {
                    reject(MESSAGES.NOT_INSERTED());
                }
            }
            else {
                reject(MESSAGES.NOT_INSERTED());
            }
        })
    }; // insert ends here

    update(employee){
        return new Promise(async (resolve,reject)=>{
            if(employee){
                 if (await updateStorage(employee)){
                     resolve(MESSAGES.UPDATE_OK(employee.id))
                 }
                 else{
                     reject(MESSAGES.NOT_UPDATED());
                 }
            }
            else {
                reject(MESSAGES.NOT_UPDATED());
            }
        });
    }; // update ends here

    remove(id){
        return new Promise (async(resolve, reject)=>{
            if (!id){
                reject(MESSAGES.NOT_FOUND('--empty--'));
            }
            else if (await removeFromStorage(id)){
                resolve(MESSAGES.REMOVE_OK(id));
            }
            else{
                reject(MESSAGES.NOT_REMOVED(id));
            }
        });
    };

} // end of class