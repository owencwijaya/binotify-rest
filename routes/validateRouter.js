const bodyParser = require("body-parser");
const express = require("express");
const passport = require("passport");
const soap = require("soap");


const User = require("../schema/user");
const auth = require("../auth");

const validateRouter = express.Router().use(bodyParser.json());

validateRouter.post('/username', (request, response) => {
    console.log(request.body.username)
    User.find(
        {
            username: request.body.username,
        }
    ).then((user) => {
        console.log(user);
        if (user.length > 0){
            response.statusCode = 204;
            response.json({
                status: 204,
                message: "Username has been used!",
                data: null
            })
            return;
        }

        response.statusCode = 200;
        response.json({
            status: 200,
            message: "Email / username is unique",
            data: null
        })
    })
})

validateRouter.post('/email', (request, response) => {
    User.find(
        {
            email: request.body.email,
        }
    ).then((user) => {
        console.log(user);
        if (user.length > 0){
            response.statusCode = 204;
            response.json({
                status: 204,
                message: "E-mail has been used!",
                data: null
            })
            return;
        }

        response.statusCode = 200;
        response.json({
            status: 200,
            message: "Email / username is unique",
            data: null
        })
    })
})

module.exports = validateRouter;