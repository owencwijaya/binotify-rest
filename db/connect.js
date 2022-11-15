const mysql = require("mysql");



const conn = mysql.createConnection({
    host: 'db-binotify-rest',
    user: 'admin',
    password: 'admin',
    database: 'binotify-rest',
});

conn.connect(err => {
    if (err) {
        throw(err)
    }

    console.log("Successfully connected to database")
})

module.exports = conn;
