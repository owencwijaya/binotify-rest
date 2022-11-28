const bodyParser = require("body-parser");
const express = require("express");
const passport = require("passport");
const soap = require("soap");


const User = require("../schema/user");
const auth = require("../auth");

const authRouter = express.Router().use(bodyParser.json());

// register endpoint, asumsikan data pengguna sudah lengkap dari frontend
authRouter.post('/register', (request, response) => {
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
                response.setHeader('Content-Type', 'application/json');
                response.json({
                    status: 200,
                    message: "Successfully registered new user!",
                    data: null
                })
            })

        })
    })
})

authRouter.post('/login', passport.authenticate('local'), (request, response) => {
    const soapURL = `${process.env.SOAP_HOST}/security/getAPIKey?wsdl`
    soap.createClient(soapURL, {}, (err, client) => {
        if (err) {
            console.log(err)
            response.statusCode = 500;
            response.setHeader('Content-Type', 'application/json');
            return response.json({
                status: 500,
                message: "Error in connecting to SOAP client",
                data: err
            })
        }

        client.getAPIKey({user_id: request.user._id.valueOf()}, (err, result) => {
            if (err) {
                response.statusCode = 500;
                response.setHeader('Content-Type', 'application/json');
                return response.json({
                    status: 500,
                    message: "Error in getting API Key from SOAP server",
                    data: err
                })
            }

            const authToken = auth.getToken({_id: request.user._id})

            User.find({
                username: request.body.username,
                password: request.body.password
            }).then((user) => {
                response.statusCode = 200;
                response.setHeader('Content-Type', 'application/json');
                response.json({
                    status: 200,
                    message: "Successfully logged in!",
                    data: {
                        auth_token: authToken,
                        api_key: result.return,
                        user: user
                    },
                })
            })
        })
    })
})


authRouter.get('/logout', (request, response) => {
    if (!request.session){
        response.statusCode = 403;
        response.json({
            status: 403,
            message: "You're not logged in",
            data: null
        })
    }

    request.session.destroy();
    response.clearCookie('session-id');

    response.statusCode = 200;
    response.json({
        status: 200,
        message: "Successfully logged out",
        data: null
    })
})

module.exports = authRouter;