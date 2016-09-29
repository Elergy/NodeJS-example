'use strict';

const express = require('express');
const http = require('http');
const exphbs = require('express-handlebars');

const models = require('./models');

const app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/test', (req, res) => {
    res.json({
        ok: true
    });
});

app.get('/group/:id', (req, res) => {
    const groupId = req.params.id;
    /*
     id - is a parameter from URL. You can go to 'http://localhost:8080/group/1',
     where 1 is an id of group of students
     */

    models.Student.getStudentsForGroup(groupId)
        .then((students) => {
            res.render('group', {students: students});
        });
});

http.createServer(app).listen(8080, () => {
    console.log('Express server listening on port 8080');
});