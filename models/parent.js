const db = require('./../database/db');

const Person = require('./person');

class Parent extends Person {
    constructor(data) {
        super();

        this.id = data.id;
        this.first_name = data.first_name;
        this.last_name = data.last_name;
        this.address = data.address;
        this.email = data.email;
        this.phone = data.phone;
    }
}

module.exports = Parent;