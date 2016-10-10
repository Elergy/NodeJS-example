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

app.get('/students/grade/:grade', (req, res) => {
    const grade = req.params.grade;

    models.Student.getStudentsWithGrade(grade)
        .then((students) => {
            res.render('group', {students: students});
        });
});

app.get('/student/:id', (req, res) => {
    const id = req.params.id;

    models.Student.getStudentById(id)
        .then((student) => {
            res.render('student', student);
        });
});

http.createServer(app).listen(8080, () => {
    console.log('Express server listening on port 8080');
});

let myCoolStydent = {
    firstName: 'Alex',
    lastName: 'Tester',
    phone: '+72342343243243',

    sayHello: function() {
        console.log('Hello!');
    }
};

let myCoolStydent1 = {
    firstName: 'Alex',
    lastName: 'Tester',
    phone: '+72342343243243',

    sayHello: function() {
        console.log('Hello!');
    }
};

let myCoolStydent2 = {
    firstName: 'Alex',
    lastName: 'Tester',
    phone: '+72342343243243',

    sayHello: function() {
        console.log('Hello!');
    }
};

// function Student(firstName, lastName, phone) {
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.phone = phone;
// }
//
// Student.prototype.sayHello = function() {
//     console.log('Hello!');  
// };

// class Student {
//     constructor(firstName, lastName, phone) {
//         this.firstName = firstName;
//         this.lastName = lastName;
//         this.phone = phone;
//     }
//    
//     sayHello() {
//         console.log('Hello!');
//     }
// }
//
// let myCoolStydent3 = new Student('Alex', 'Tester', '23234');
// let myCoolStydent4 = new Student('Alexa', 'Tesdfasfdter', '23234');
// myCoolStydent3.sayHello();
// myCoolStydent4.sayHello();
//
// console.log(myCoolStydent3.sayHello === myCoolStydent4.sayHello);

//myCoolStydent.sayHello(); //Hello!


function addStudentToDatabase(studentData) {
    db.table('Student')
        .insert(studentData);
}

//addStudentToDatabase(myCoolStydent);