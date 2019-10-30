var express = require('express');
var router = express.Router();
const crypto = require("crypto");
const db = require('../db');
const sqlite3 = require("sqlite3").verbose();

const crypto_id = crypto.randomBytes(16).toString("hex");

/* GET home page. */
router.post('/', function(req, res) {
    db.run("INSERT INTO Tasks_Table (Task_ID, Task_Name, Date, Task_Type, Is_Finished, Notes) VALUES ('" + crypto_id + "', '" + req.body.task.name + "', '" + req.body.task.date + "', '" + req.body.task.type + "', '" + req.body.task.isFinished + "', '" +req.body.task.notes + "')");
});

module.exports = router;
