const express = require("express");
const router = express.Router();

const sqlite3 = require("sqlite3").verbose();
const crypto = require("crypto");
const loremIpsum = require("lorem-ipsum").LoremIpsum;

const lorem = new loremIpsum();
const db = new sqlite3.Database('./db/tasks.db', (err)=>{
  if (err){
    console.log(err.message);
  }

  console.log("connected to tasks db");
});


let task;
let tasksArray = [];

// db.run("DROP TABLE IF EXISTS Tasks_Table");
// db.run(`DELETE FROM Tasks_Table`);


let seedDB = () => {
    db.run("CREATE TABLE IF NOT EXISTS Tasks_Table (Task_ID varchar(255), Task_Name varchar(255), Date DATE, Task_Type varchar(255), Is_Finished varchar(255), Notes varchar(255));");
    for (var i = 0; i < 3; i++){
        const crypto_id = crypto.randomBytes(16).toString("hex");
        db.run("INSERT INTO Tasks_Table(Task_ID, Task_Name, Date, Task_Type, Is_Finished, Notes) VALUES ('" + crypto_id + "', '" + lorem.generateWords(5) + "', 2019-11-01, '" + lorem.generateWords(1) + "', 'false', '" + lorem.generateSentences(3) + "')");    
    }
}

// seedDB();

db.serialize(() => {
db.each("SELECT Task_ID as id, Task_Name as name, Date as date, Task_Type as type, Is_Finished as isFinished, Notes as notes FROM Tasks_Table", (err, row) => {
      if (err) {
        console.error(err.message);
      }
    //   console.log(row.id + "\t" + row.name);
      task = {
          id: row.id,
          name: row.name, 
          date: row.date,
          type: row.type,
          isFinished: row.isFinished,
          notes: row.notes,
      }
      tasksArray.push(task);
    });
  });


console.log(db.run("SELECT Task_Name FROM Tasks_Table"));

db.close((err) => {
    if (err){
      console.log(err.message);
    }

    console.log("closed tasks db connection");
});


router.get("/", function(req, res, next) {
    res.send(tasksArray);
});

module.exports = router;