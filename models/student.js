const db = require('./../database/db');

const Person = require('./person');

class Student extends Person {
    constructor(data) {
        super();
        
        this.id = data.id;
        this.first_name = data.first_name;
        this.last_name = data.last_name;
    }

    static getStudentsWithGrade(grade) {
        return db('Student')
            .where('grade', grade)
            .then((studentsData) => {
                return studentsData.map((studentData) => new Student(studentData));
            });
    }
    
    static getStudentById(id) {
        return db('Student')
            .where('id', id)
            .then((studentsData) => {
                const studentData = studentsData[0];
                
                return new Student(studentData);
            });
    }
}

module.exports = Student;