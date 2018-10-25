const express = require('express')
const router = express.Router()
const sqlite3 = require('sqlite3').verbose()
// const db = new sqlite3.Database('./data/wallet.db')

// db.serialize(function() {
//     db.run("CREATE TABLE IF NOT EXISTS accounts (id INTEGER, name TEXT)");
//     db.run("INSERT INTO accounts (id, name) VALUES (1, 'machy')");
// });

let db = new sqlite3.Database('./data/wallet.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the wallet database.');
});

router.get('/', function(req, res){
    db.serialize(() => {
        db.each(`SELECT * FROM accounts`, (err, row) => {
          if (err) {
            console.error(err.message);
          }
          res.send(row.id + "\t" + row.name);
          db.close();
        });
      });
})

module.exports = router