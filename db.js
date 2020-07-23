const sqlite3 = require('sqlite3').verbose();

// DB Connection
let db = new sqlite3.Database('./parking.db', (err) => {
    if (err) {
        // console.error(err.message);
        return;
    }

    db.run(`CREATE TABLE IF NOT EXISTS setting (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        metaName TEXT,
        metaValue TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS parking (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        carNumber TEXT,
        slotNumber INTEGER
    )`);
});

const select = (sql) => new Promise((resolve, reject) => {
    db.get(sql, (err, res) => {
        if (err) {
            reject(err)
        }

        resolve(res);
    });
});

const selectAll = (sql) => new Promise((resolve, reject) => {
    db.all(sql, (err, res) => {
        if (err) {
            reject(err)
        }

        resolve(res);
    });
});

const query = (sql) => db.run(sql);

module.exports = {
    select,
    selectAll,
    query
}