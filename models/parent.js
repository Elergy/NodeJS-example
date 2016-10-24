const db = require('./../database/db');

const Person = require('./person');

class Parent extends Person {
    constructor(data) {
        super();

        if (data.id) {
            this.id = data.id;
        }
        
        this.first_name = data.first_name;
        this.last_name = data.last_name;
        this.address = data.address;
        this.email = data.email;
        this.phone = data.phone;
    }
    
    saveToDB() {
        return db('Parent')
            .returning('id')
            .insert(this)
            .then(function(arrayIds) {
                return arrayIds[0];
            });
    }
    
    
}

module.exports = Parent;