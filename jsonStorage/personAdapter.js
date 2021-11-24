'use strict';

function adapt (item){
    console.log('personAdapter')
    return Object.assign(item,{
        id: +item.id,
        salary: +item.salary //Number(item.salary) would work as well
    })
}

module.exports = {adapt};