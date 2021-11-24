# Emloyee data storage

## employee.json

The id is unique

```json
[
  {
    "id": 1,
    "firstname": "Leila",
    "lastname": "Hökki",
    "department": "ict",
    "salary": 4000
  },
  {
    "id": 2,
    "firstname": "Matt",
    "lastname": "River",
    "department": "ict",
    "salary": 4000
  }
]
```

---

### Public API (methods of Datastorage)

#### dataStorageLayer.js

- getAll()
  <!-- the / in the following line means "or". Hence, it returns "this" / "or" "that" -->

  - returns an array of all employees / []

- getOne(id)

  - returns an employee object / NOT_FOUND

- insert(newEmployee)

  - returns INSERT_OK / NOT_INSERTED / ALREADY_IN_USE

- update(updatedEmployee)

  - returns UPDATE_OK / NOT_UPDATED

- remove(id)

  - returns REMOVE_OK / NOT_FOUND / NOT_REMOVED

- getter for status codes
  - returns an object of status codes

---

### Private API

#### readerWriter.js

- readStorage(storageFile)

  - returns an array of employees / []

- writeStorage(storageFile, data)
  - returns true / false

#### storageLayer.js

- getAllFromStorage()

  - returns an array of employees / []

- getOneFromStorage(id)

  - returns an employee object / null

- addToStorage(newEmployee)

  - returns true/false

- updateStorage (updatedEmployee)

  - returns true/false

- removeFromStorage (id)
  - returns true/false

### status codes and messages

```js
const CODES = {
    PROGRAM_ERROR:0,
    NOT_FOUND:1,
    INSERT_OK:2,
    ....
}
```

The format of an status message is:

(status types are `error` or `info`)

```js
const MESSAGES = {
  PROGRAM_ERROR: () => ({
    message: "Sorry! Error in the program",
    code: CODES.PROGRAM_EROR,
    type: "error",
  }),
  NOT_FOUND: id =>({
    message: `No employee found with id ${id}`,
    code:CODES.NOT_FOUND,
    type:'error'
  }),
  INSERT_OK: id=>({
    message: `Employee ${id} was inserted`,
    code:CODES.INSERT_OK,
    type:'info'
  }),
  ....
};
```
