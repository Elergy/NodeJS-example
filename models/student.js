const db = require('./../database/db');

function Student(data) {
    this.id = data.id;
    this.name = data.name;
    this.surname = data.surname;
}

Student.prototype.toString = function() {
    /*
     We can use handlebars-template like that:
     {{#each students}}
        {{this}}
     {{/each}}

     because {{this}} runs the .toString() method and prints the string representation of Student
     */
    return this.name + ' ' + this.surname;
};

Student.prototype.getClassesForStudent = function() {
    /*
     now we don't have a Class table in DB, but where we create, we'll write the code
     to return information about classes the student assigned.
     */
};

Student.getStudentsForGroup = function(groupId) {
    return db('Student')
        .where('group_id', groupId)
        .then((studentsData) => {
            return studentsData.map((studentData) => new Student(studentData));
        });
};

module.exports = Student;