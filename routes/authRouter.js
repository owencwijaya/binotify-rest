const bodyParser = require("body-parser");
const { Router } = require("express");
const express = require("express");
const passport = require("passport");

const User = require("../schema/user");

const authRouter = express.Router().use(bodyParser.json());

// register endpoint, asumsikan data pengguna sudah lengkap dari frontend
Router.post('/register', (request, response, next) => {
    const newUser = {
        email: request.body.email,
        password: request.body.password,
        username: request.body.username,
        name: request.body.name,
    }
    User.register(new User(newUser), request.body.password, (error, user) => {
        if (error) {
            response.statusCode = 500;
            response.setHeader('Content-Type', 'application/json');
            response.json({
                status: 500,
                message: "Error in registering new user",
                data: error
            })
            return;
        }

        user.save((error, user) => {
            if (error){
                response.statusCode = 500;
                response.setHeader('Content-Type', 'application/json');
                response.json({
                    status: 500,
                    message: "Error in saving new user data",
                    data: error
                });
                return;
            }

            passport.authenticate('local')(request, response, () => {
                response.statusCode = 200;
                response.setHeader('COntent-Type, appliaction/json');
                response.json({
                    status: 200,
                    message: "Successfully registered new user!",
                    data: null
                })
            })

        })
    })
})