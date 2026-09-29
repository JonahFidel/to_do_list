// helper file to connect to the database

const fs = require("fs");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const dbPath = process.env.SQLITE_DB || path.join(__dirname, "db", "tasks.db");
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.log(err.message);
        return;
    }

    console.log("connected to tasks db");
});

db.run("CREATE TABLE IF NOT EXISTS Tasks_Table (Task_ID varchar(255), Task_Name varchar(255), Date DATE, Task_Type varchar(255), Is_Finished varchar(255), Notes varchar(255));");

module.exports = db;
