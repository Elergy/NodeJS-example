const db = require('./../database/db');

const Person = require('./person');
const Parent = require('./parent');

class Student extends Person {
    constructor(data) {
        super();
        
        this.id = data.id;
        this.first_name = data.first_name;
        this.last_name = data.last_name;
    }
    
    addParent(data) {
        const parent = new Parent(data);

        parent
            .saveToDB()
            .then((idOfParent) => {
                return db('Parent_Student')
                    .insert({
                        parent_id: idOfParent,
                        student_id: this.id
                    });
            });
    }

    loadParentsForStudent() {
        const subQuery = db('Parent_Student')
            .where('student_id', this.id)
            .select('parent_id');
        
        return db('Parent')
            .whereIn('id', subQuery)
            .then((parentsData) => {
                const parents = parentsData
                    .map((dataAboutOneParent) => new Parent(dataAboutOneParent));
                
                return parents;
            })
            .then((parents) => {
                this.parents = parents;
                
                return this;
            });
    }

    static getStudentsWithGrade(grade) {
        return db('Student')
            .where('grade', grade)
            .then((studentsData) => {
                return studentsData.map((dataOfOneStudent) => new Student(dataOfOneStudent));
            });
    }
    
    static getStudentById(id) {
        return db('Student')
            .where('id', id)
            .then((studentsData) => {
                const studentData = studentsData[0];
                
                let student =  new Student(studentData);
                return student.loadParentsForStudent();
            });
    }
}

module.exports = Student;