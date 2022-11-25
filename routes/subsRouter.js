const bodyParser = require("body-parser");
const express = require("express");

const auth = require("../auth");

// ini buat nerusin request ke soap
const subsRouter = express.Router().use(bodyParser.json());

// user binotify premium meminta list request subscription
subsRouter.route( '/')
    .get((request, response, next) => {
        // minta ke soap
    })

    .put(auth.verifyUser, auth.verifyAdmin, (request, response, next) => {
        // update status ACCEPTED / REJECTED
    })

    .post(auth.verifyUser, auth.verifyAdmin, (request, response, next) => {
        // dari binotify app tambahin ke soap
    })

module.exports = subsRouter
