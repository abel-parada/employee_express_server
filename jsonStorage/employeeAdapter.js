// this will adapt id and salary to numbers and leave the rest in strings.

'use strict';

function adapt(item){
    return {
        id: +item.id,
        firstname: item.firstname,
        lastname: item.lastname,
        department: item.department,
        salary: +item.salary
    }
}

module.exports={adapt};