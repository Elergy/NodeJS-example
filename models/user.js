const db = require('./../database/db');
const crypto = require('crypto');

class User {
    constructor(data, needHashPassword=false) {
        if (data.id) {
            this.id = data.id;
        }

        this.email = data.email;

        if (needHashPassword) {
            // data.password = crypto.createHmac('sha256', 'sdfasjfjwrejwrojwr')
            //     .upda

            data.password = crypto.createHmac('sha256', '12345')
                .update(data.password)
                .digest('hex');

        }
        
        this.password = data.password;
    }

    saveToDB() {
        return db('Users')
            .returning('id')
            .insert(this)
            .then(function(arrayIds) {
                return arrayIds[0];
            });
    }

    static getUserById(id) {
        return db('Users')
            .where('id', id)
            .then((usersData) => {
                const userData = usersData[0];

                console.log(userData);
                let user = new User(userData);

                return user;
            });
    }

    static getUserByEmail(email) {
        return db('Users')
            .where('email', email)
            .then((usersData) => {
                const userData = usersData[0];

                let user = new User(userData);
                
                return user;
                
            });
    }
    
    isPasswordValid(password) {
        password = crypto.createHmac('sha256', '12345')
            .update(password)
            .digest('hex');
        
        return this.password === password;
    }


}

module.exports = User;