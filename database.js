exports.select = function (cb){
    var list = [];
    const sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('./data/wallet.db');           
    db.all("SELECT * FROM accounts", function(err,rows){
         if(err) return cb(err);
         let ctr = 0; 
         rows.forEach(function (row) { 
            list[ctr] = row.id + ";" + row.name + ";" + row.balance}); 
        db.close();
        return cb(null, list);
    });
    // db.run("CREATE TABLE IF NOT EXISTS accounts (id INTEGER, accountNumber TEXT,  name TEXT, balance INTEGER ,pin TEXT)");
    // db.run("INSERT INTO accounts (id, accountNumber, name, balance, pin) VALUES (2, '0000-0000-0002', 'cuya', 1000,'123456')"); 
 }