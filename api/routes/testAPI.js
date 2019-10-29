const express = require("express");
const router = express.Router();

const sqlite3 = require('sqlite3').verbose();
let myNewVar;
let db = new sqlite3.Database('./db/chinook.db', (err)=>{
  if (err){
    console.log(err.message);
  }

  console.log("connected to chinook db");
  myNewVar = "connected to chinook db wawaawasdf";
});

db.serialize(() => {
    db.each(`SELECT PlaylistId as id,
                    Name as name
             FROM playlists`, (err, row) => {
      if (err) {
        console.error(err.message);
      }
      console.log(row.id + "\t" + row.name);
      myNewVar += row.id + "\t" + row.name;
    });
  });

db.close((err) => {
    if (err){
      console.log(err.message);
    }

    console.log("closed chinook db connection");
});

router.get("/", function(req, res, next) {
    res.send(myNewVar);
});

module.exports = router;