const bodyParser = require("body-parser");
const express = require("express");
const passport = require("passport");

const User = require("../schema/user");
const Song = require("../schema/song");

const auth = require("../auth");

const songRouter = express.Router().use(bodyParser.json());

songRouter.route('/')
    // get all songs
    .get((request, response, next) => {
        Song.find({}).then(
            (songs) => {
                response.statusCode = 200;
                response.setHeader('Content-Type', 'application/json');
                response.json({
                    status: 200,
                    message: "Successfully obtained list of songs",
                    data: songs
                })
            },
            (err) => next(err))
        .catch((err) => next(err))
    })
    // create song
    .post(auth.verifyUser, (request, response, next) => {
        Song.create({
            judul: request.body.judul,
            id_penyanyi: request.user._id,
            audio_path: request.body.audio_path
        }).then(
            (song) => {
                response.statusCode = 200;
                response.setHeader('Content-Type', 'application/json');
                response.json({
                    status: 200,
                    message: "Successfully added new song!",
                    data: song
                });
            },
            (err) => next(err)
        ).catch((err) => next(err));
    })

songRouter.route('/:song_id')
    // get song
    .get(auth.verifyUser, (request, response, next) => {
        Song.find({_id: request.params.song_id}).then(
            (song) => {
                response.statusCode = 200;
                response.setHeader('Content-Type', 'application/json');
                response.json({
                    status: 200,
                    message: "Successfully retrieved song data",
                    data: song
                })
            },
            (err) => next(err))
        .catch((err) => next(err))
    })

    // update song
    .put(auth.verifyUser, (request, response, next) => {
        Song.findById(request.params.song_id).then(
            (song) => {
                if (!(song.id_penyanyi.equals(request.user._id))){
                    response.statusCode = 403;
                    response.setHeader('Content-Type', 'application/json');
                    response.json({
                        status: 403,
                        message: "User unauthorized to edit this song",
                        data: null
                    });
                    return;
                }

                Song.findByIdAndUpdate(
                    request.params.song_id,
                    { $set: request.body },
                    { new: true}
                ).then((song) => {
                    response.statusCode = 200;
                    response.setHeader('Content-Type', 'application/json');
                    response.json({
                        status: 200,
                        message: "Successfully updated song!",
                        data: song
                    })
                })
            },
            (err) => next(err))
        .catch((err) => next(err))
    })

    .delete(auth.verifyUser, (request, response, next) => {
        Song.findById(request.params.song_id).then(
            (song) => {
                if (!(song.id_penyanyi.equals(request.user._id))){
                    response.statusCode = 403;
                    response.setHeader('Content-Type', 'application/json');
                    response.json({
                        status: 403,
                        message: "User unauthorized to delete this song",
                        data: null
                    });
                    return;
                }


                Song.deleteOne({_id: song._id}).then((song) => {
                    response.statusCode = 200;
                    response.setHeader('Content-Type', 'application/json');
                    response.json({
                        status: 200,
                        message: "Successfully deleted song!",
                        data: song
                    })
                })
            },
            (err) => next(err))
        .catch((err) => next(err))
    })

module.exports = songRouter;