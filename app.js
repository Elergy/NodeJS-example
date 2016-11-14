'use strict';

const express = require('express');
const http = require('http');
const exphbs = require('express-handlebars');

const models = require('./models');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');

require('./auth');

const app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser());
app.use(session({ secret: 'dslkfjqjfwerwer' }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/test', (req, res) => {
    console.log('hello! i am from test!');
    console.log(req.user);
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

// router.get('/:id', () => {
//     //
// });
//
// app.use('/student', )

app.get('/student/:id', (req, res) => {
    const id = req.params.id;

    models.Student.getStudentById(id)
        .then((student) => {
            res.render('student', student);
        });
});

app.get('/student/:id/add-parent', (req, res) => {
    res.render('add-parent', {id: req.params.id});
});

app.post('/student/:id/parent', (req, res) => {
    const id = req.params.id;
    
    models.Student.getStudentById(id)
        .then((student) => {
            return student.addParent(req.body);
        })
        .then(() => {
            res.redirect('/student/' + req.params.id);
        });
});

app.get('/register', (req, res) => {
    res.render('registration');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', passport.authenticate(
    'local', 
    { 
        successRedirect: '/students/grade/2',
    
        failureRedirect: '/login' 
    })
);

app.post('/user', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    
    const user = new models.User({
        email: email,
        password: password
    }, true);
    
    user.saveToDB()
        .then(() => {
            res.json({
                ok: true
            })
        })
        .catch((ex) => {
            res.json({
                exception: ex.message
            });
        })
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

let a = [1, 2, 3, 4, 5];

// for (let i=0; i< a.length; i++ ) {
//     console.log(a[i]);
// }

// let b = a.filter(function(element, index) {
//     const isLessThanFour = element < 4;
//    
//     console.log(`element = ${element}, index = ${index}, result = ${isLessThanFour}`);
//    
//     return isLessThanFour;
// });

// let sum = a.reduce(function(tempSum, currentElement) {
//     tempSum = tempSum + currentElement;
//
//     return tempSum;
// }, 0);
//
// console.log(sum);
