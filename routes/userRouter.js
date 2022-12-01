const bodyParser = require("body-parser");
const express = require("express");
const Song = require("../schema/song");
const User = require("../schema/user");
const ObjectId = require('mongodb').ObjectId;
const soap = require("soap");
const dotenv = require("dotenv");
dotenv.config()


const userRouter = express.Router().use(bodyParser.json());
const api_key = process.env.SOAP_API_KEY;

// dapetin daftar pengguna (penyanyi) BiNotify Premium,
// dipake dari binotify-app
userRouter.get('/', (request, response, next) => {
    User.find({admin: false}, {name: 1}).then((users) => {
        response.statusCode = 200;
        response.setHeader("Content-Type", "application/json");
        response.json({
            status: 200,
            message: "Successfully retrieved user list!",
            data: users
        })
    }, (error) => next(error))
    .catch((error) => next(error))
})


userRouter.get('/:user_id', (request, response, next) => {
    User.find({
        admin: false,
        _id: request.params.user_id
    }).then((user) => {
        response.statusCode = 200;
        response.setHeader("Content-Type", "application/json");
        response.json({
            status: 200,
            message: "Successfully retrieved user information!",
            data: user
        })
    }, (error) => next(error))
    .catch((error) => next(error))
})

userRouter.get('/:user_id/songs', (request, response, next) => {

    const soapURL = `${process.env.SOAP_HOST}/subscription/checkUserSubbed?wsdl`
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

        client.checkUserSubbed({
            creator_id: request.params.user_id,
            subscriber_id: request.query.user_id,
            api_key: api_key
        }, (err, result) => {
            if (err){
                response.statusCode = 500;
                response.setHeader('Content-Type', 'application/json');
                return response.json({
                    status: 500,
                    message: "Error in getting subscription status from SOAP server",
                    data: null
                })
            }

            if (!result.return){
                response.statusCode = 401;
                response.setHeader('Content-Type', 'application/json');
                return response.json({
                    status: 401,
                    message: "User hasn't subscribed to artist yet!",
                    data: null
                })
            }

            Song.find({id_penyanyi: request.params.user_id}).then(
                (songs) => {
                    User.findOne({_id: request.params.user_id}, {name: 1}).then((artist) => {
                        response.statusCode = 200;
                        response.setHeader("Content-Type", "application/json");
                        response.json({
                            status: 200,
                            message: "Successfully retrieved song list!",
                            data: {
                                songs: songs,
                                name: artist.name
                            }
                        })
                    })

                },
                (error) => next(error))
            .catch((error) => next(error))
        })
    })
})


module.exports = userRouter;