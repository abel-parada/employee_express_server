'use strict';

const http = require('http');
const path = require('path');

const express = require('express'); // this is found in node_modules
const app = express();

const {port,host,storage} = require('./serverConfig.json');// this is from our config file so we can parametrize later

const Datastorage = require(path.join(__dirname,storage.storageFolder, storage.dataLayer));//we import the class Datastorage we created in dataStorageLayer

const dataStorage = new Datastorage();

const server = http.createServer(app);

app.set('view engine', 'ejs');// here we state we want to use ejs
app.set('views', path.join(__dirname, 'pageviews'));

app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

const menuPath = path.join(__dirname,'menu.html');

app.get('/', (req,res) => res.sendFile(menuPath));

app.get('/all', (req,res) => dataStorage.getAll().then(data=>res.render('allPersons',{result:data})));

app.get('/getPerson', (req,res)=>res.render('getPerson',{
    title: 'Get',
    header: 'Get',
    action:'/getPerson'
}));

app.post('/getPerson', (req,res)=>{
    if(!req.body) res.sendStatus(500);

    const employeeId = req.body.id;
    dataStorage.getOne(employeeId)
        .then(employee=>res.render('personPage',{result:employee}))
        .catch(error=>sendErrorPage(res,error));
});

app.get('/removeperson', (req,res)=>res.render('getPerson',{
    title: 'Remove',
    header: 'Remove a person',
    action: '/removeperson'
}));

app.post('/removeperson', (req,res)=>{
    if(!req.body) res.sendStatus(500);

    const employeeId = req.body.id;
    dataStorage.remove(employeeId)
        .then(status=>sendStatusPage(res,status))
        .catch(error=>sendErrorPage(res,error))
});

app.get('/inputform', (req,res)=> res.render('form',{
    title: 'Add employee',
    header: 'Add a new employee',
    action: '/insert',
    id:{value:'', readonly:''},
    firstname:{value:'',readonly:''},
    lastname:{value:'',readonly:''},
    department:{value:'',readonly:''},
    salary:{value:'',readonly:''},
}));

app.post('/insert',(req,res)=> {
    if(!req.body) res.sendStatus(500);
    dataStorage.insert(req.body)
        .then(status=>sendStatusPage(res,status))
        .catch(error=>sendErrorPage(res,error))
});

app.get('/updateform', (req,res)=> res.render('form',{
    title: 'Update employee',
    header: 'Update an existing employee',
    action: '/updatedata',
    id:{value:'', readonly:''},
    firstname:{value:'',readonly:'readonly'},
    lastname:{value:'',readonly:'readonly'},
    department:{value:'',readonly:'readonly'},
    salary:{value:'',readonly:'readonly'},
}));

app.post('/updatedata', (req,res)=>{
    if(!req.body) res.sendStatus(500);
    dataStorage.getOne(req.body.id)
        .then(person=> res.render('form',{
            title: 'Update employee',
            header: 'Update an existing employee',
            action: '/update',
            id:{value: person.id, readonly:'readonly'},
            firstname:{value: person.firstname,readonly:''},
            lastname:{value:person.lastname,readonly:''},
            department:{value:person.department,readonly:''},
            salary:{value:person.salary,readonly:''},
        }))
        .catch(error=>sendErrorPage(res,error));
});

app.post('/update',(req,res)=> {
    if(!req.body) res.sendStatus(500);
    dataStorage.update(req.body)
        .then(status=>sendStatusPage(res,status))
        .catch(error=>sendErrorPage(res,error))
});

server.listen(port, host, () => console.log(`${host}:${port} serving...`));

function sendErrorPage(res,error, title='Error', header='Error'){
    sendStatusPage(res,error, title, header);
}

function sendStatusPage(res,status,title='Status',header='Status'){
    return res.render('statusPage', {title,header,status});
}