const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const loremIpsum = require("lorem-ipsum").LoremIpsum;
const db = require("../db");

const lorem = new loremIpsum();

let tasksArray = [];
let task;

// uncomment to clear the table
// db.run("DROP TABLE IF EXISTS Tasks_Table");
// db.run("DELETE FROM Tasks_Table");

// add mock data to the table
let seedDB = () => {
    db.run("CREATE TABLE IF NOT EXISTS Tasks_Table (Task_ID varchar(255), Task_Name varchar(255), Date DATE, Task_Type varchar(255), Is_Finished varchar(255), Notes varchar(255));");
    for (var i = 0; i < 3; i++){
        const crypto_id = crypto.randomBytes(16).toString("hex");
        db.run("INSERT INTO Tasks_Table(Task_ID, Task_Name, Date, Task_Type, Is_Finished, Notes) VALUES ('" + crypto_id + "', '" + lorem.generateWords(5) + "', 2019-11-01, '" + lorem.generateWords(1) + "', 'false', '" + lorem.generateSentences(3) + "')");    
    }
}

// seedDB();

router.post('/', function(req, res, next) {
  const crypto_id = crypto.randomBytes(16).toString("hex");
  db.run("INSERT INTO Tasks_Table (Task_ID, Task_Name, Date, Task_Type, Is_Finished, Notes) VALUES ('" + crypto_id + "', '" + req.body.task.name + "', '" + req.body.task.date + "', '" + req.body.task.type + "', '" + req.body.task.isFinished + "', '" +req.body.task.notes + "')");
});


router.get('/', function(req, res, next) {
  db.serialize(() => {

      db.each("SELECT Task_ID as id, Task_Name as name, Date as date, Task_Type as type, Is_Finished as isFinished, Notes as notes FROM Tasks_Table", (err, row) => {
        if (err) {
          console.error(err.message);
        }
        
        // create task object
        task = {
            id: row.id,
            name: row.name, 
            date: row.date,
            type: row.type,
            isFinished: row.isFinished,
            notes: row.notes,
        }
        // send tasks to the client
        tasksArray.push(task);
      });
    });

    res.send(tasksArray);

    // clear the tasks array
    tasksArray=[];
});

module.exports = router;