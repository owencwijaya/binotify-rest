const bodyParser = require("body-parser");
const express = require("express");

const conn = require("../db/connect");

const userRouter = express.Router().use(bodyParser.json());

// dapetin daftar pengguna (penyanyi) BiNotify Premium,
// dipake dari binotify-app
userRouter.get('/', (request, response, next) => {
    conn.execute("SELECT * FROM user").then(
        (res) => {
            console.log(res);
            response.statusCode = 200;
            response.setHeader("Content-Type", "application/json");
            response.json(res);
            
        }
    )
    .catch((error) => next(error))   
})

module.exports = userRouter;