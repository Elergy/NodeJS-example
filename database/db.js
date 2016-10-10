const knex = require('knex');

const db = knex({
    dialect: 'sqlite3',
    connection: {
        filename: './database/data1.db'
    }
});

module.exports = db;