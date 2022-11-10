const mysql = require("mysql");


// MYSQL_USER: admin-rest
// MYSQL_PASSWORD: admin-rest
// MARIADB_ROOT_PASSWORD: MARIADB_ROOT_PASSWORD
// MYSQL_DATABASE: binotify-rest

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