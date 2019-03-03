const fs = require('fs');
const low = require('lowdb');
const express = require('express');
const chalk = require('chalk');
const app = express();
var path = require('path');

//middlewear
app.use(express.static('public'))
app.use(express.static(path.join(__dirname, '/template/assets')));
app.use('/static', express.static(path.join(__dirname, '/public/dashboard.css')));

app.get('/dashboard.css', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/dashboard.css'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/gpa.html'));
});

app.get('/gpa', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/gpa.html'));
});

app.get('/grades', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/grades.html'));
});

app.get('/colleges', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/colleges.html'));
});

app.get('/public/people/person1.json', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/people/person1.json'));
});

app.listen(8080);
console.log(chalk.blue('Listening on port 8080'));
