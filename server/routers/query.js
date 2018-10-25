const express = require('express')
const router = express.Router()
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./data/wallet.db')

db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS accounts (id INTEGER, accountNumber TEXT,  name TEXT, pin TEXT)");
    db.run("INSERT INTO accounts (id, accountNumber, name, pin) VALUES (1, 'machy')");
});

module.exports = router