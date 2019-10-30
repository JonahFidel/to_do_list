var express = require('express');
var router = express.Router();
const crypto = require("crypto");
// const db = require('../db');
const sqlite3 = require("sqlite3").verbose();

const crypto_id = crypto.randomBytes(16).toString("hex");

let db = new sqlite3.Database('./db/tasks.db', (err) => {
    if (err) {
        console.log(err.message);
    }

    console.log("connected to tasks db");
});

/* GET home page. */
router.post('/', function(req, res) {
    console.log(req.body.task);
    db.run("INSERT INTO Tasks_Table (Task_ID, Task_Name, Date, Task_Type, Is_Finished, Notes) VALUES ('" + crypto_id + "', '" + req.body.task.name + "', '" + req.body.task.date + "', '" + req.body.task.type + "', '" + req.body.task.isFinished + "', '" +req.body.task.notes + "')");

    console.log("big big big");
  res.send("hello world");
});


module.exports = router;

// INSERT INTO Tasks_Table (Task_ID, Task_Name, Date, Task_Type, Is_Finished, Notes) VALUES ('zooom', 'gooodbody', '12/21/2002', 'truck', 'cannon', 'time')
