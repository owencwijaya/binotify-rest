const bodyParser = require("body-parser");
const express = require("express");

const User = require("../schema/user");

const userRouter = express.Router().use(bodyParser.json());

// dapetin daftar pengguna (penyanyi) BiNotify Premium,
// dipake dari binotify-app
userRouter.get('/', (request, response, next) => {
    User.find({admin: false}).then((users) => {
        response.statusCode = 200;
        response.setHeader("Content-Type", "application/json");
        response.json(users);
    }, (error) => next(error))
    .catch((error) => next(error))
})

module.exports = userRouter;