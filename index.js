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

server.listen(port, host, () => console.log(`${host}:${port} serving...`));