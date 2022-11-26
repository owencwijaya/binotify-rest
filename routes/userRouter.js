const bodyParser = require("body-parser");
const express = require("express");
const Song = require("../schema/song");
const User = require("../schema/user");
const ObjectId = require('mongodb').ObjectId;

const userRouter = express.Router().use(bodyParser.json());

// dapetin daftar pengguna (penyanyi) BiNotify Premium,
// dipake dari binotify-app
userRouter.get('/', (request, response, next) => {
    User.find({admin: false}).then((users) => {
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

    // STUB: cek ke soap apakah si user binotify-app punya
    // akses ke soapfd
    // sementara ngebalikin dulu list lagu penyanyi
    // harus dibedain juga yang mana yang dari premium, yang mana dari app
    // utk premium, kasusnya bakal dipake untuk penyanyi yang mo edit
    Song.find({id_penyanyi: request.params.user_id}).then(
        (songs) => {
            response.statusCode = 200;
            response.setHeader("Content-Type", "application/json");
            response.json({
                status: 200,
                message: "Successfully retrieved song list!",
                data: songs
            })
        },
        (error) => next(error))
    .catch((error) => next(error))
})


module.exports = userRouter;