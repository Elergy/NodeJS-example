const db = require('./../database/db');
const crypto = require('crypto');

const secret = 'abcde';

class User {
    constructor(data, passwordIsNotEncrypted) {

        if (data.id) {
            this.id = data.id;
        }
        
        this.email = data.email;
        if (passwordIsNotEncrypted) {
            data.password = crypto.createHmac('sha256', secret)
                .update(data.password)
                .digest('hex');
        }
        this.password = data.password;
        this.session_id = data.session_id;
    }
    
    get sessionId() {
        return this.session_id;
    }
    
    static getUserById(id) {
        return db('Users')
            .where('id', id)
            .then((usersData) => {
                const userData = usersData[0];
                
                return new User(userData);
            });
    }

    saveToDB() {
        if (!this.session_id) {
            this.session_id = (Math.random() * 100000000000000000).toString();
        }
        
        return db('Users')
            .returning('id')
            .insert(this)
            .then((arrayIds) => {
                this.id = arrayIds[0];
                
                return this
            });
    }
    
    isValidUserSession(sessionId) {
        return this.sessionId === sessionId;
    }
}

module.exports = User;