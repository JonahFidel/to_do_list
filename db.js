// helper file to connect to the database

const sqlite3 = require("sqlite3").verbose();
let db;

console.log('asdfs')

function connectDatabase() {
    if (!db) {
        db = new sqlite3.Database('./db/tasks.db', (err) => {
            if (err) {
                console.log(err.message);
            }

            console.log("connected to tasks db");
        });
    }
    return db
}

module.exports = connectDatabase();