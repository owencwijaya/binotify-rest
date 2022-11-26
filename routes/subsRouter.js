const bodyParser = require("body-parser");
const express = require("express");
const soap = require("soap");
const dotenv = require("dotenv");
dotenv.config();

const auth = require("../auth");

// ini buat nerusin request ke soap
const subsRouter = express.Router().use(bodyParser.json());

// user binotify premium meminta list request subscription
subsRouter.route( '/')
    .get(auth.verifyUser, auth.verifyAdmin, (request, response, next) => {
        // minta ke soap
        const soapURL = `${process.env.SOAP_HOST}/subscription/getSubs?wsdl`
        console.log(soapURL);
        soap.createClient(soapURL, {}, (err, client) => {
            if (err) {
                response.statusCode = 500;
                response.setHeader('Content-Type', 'application/json');
                response.json({
                    status: 500,
                    message: "Error in connecting to SOAP client",
                    data: err
                })
            }

            const user_id = request.user._id.valueOf();
            // asumsi api key dikirim dari request
            const api_key = request.body.api_key;

            console.log(client.describe())
            client.getSubs({
                api_key: api_key,
                user_id: user_id
            }, (err, result) => {
                if (err) {
                    response.statusCode = 500;
                    response.setHeader('Content-Type', 'application/json');
                    response.json({
                        status: 500,
                        message: "Error in getting subscription list",
                        data: err
                    })
                }

                response.statusCode = 200;
                response.setHeader('Content-Type', 'application/json');
                response.json({
                    status: 200,
                    message: "Successfully retrieved user list",
                    data: result
                })
            })
        })
    })

    .put(auth.verifyUser, auth.verifyAdmin, (request, response, next) => {
        // update status ACCEPTED / REJECTED
        // dari react ngirim creator_id, subscriber_id, ama status 'ACCEPTED' ato 'REJECTED'
        // minta ke soap
        const soapURL = `${process.env.SOAP_HOST}/subscription/updateSubs?wsdl`
        console.log(soapURL);
        soap.createClient(soapURL, {}, (err, client) => {
            if (err) {
                response.statusCode = 500;
                response.setHeader('Content-Type', 'application/json');
                response.json({
                    status: 500,
                    message: "Error in connecting to SOAP client",
                    data: err
                })
            }

            const user_id = request.user._id.valueOf();
            // asumsi api key dikirim dari request
            const api_key = request.body.api_key;
            const creator_id = request.body.creator_id;
            const subscriber_id = request.body.subscriber_id;
            const new_status = request.body.subscriber_id;


            client.updateSubs({
                api_key: api_key,
                user_id: user_id,
                creator_id: creator_id,
                subscriber_id: subscriber_id,
                new_status: new_status
            }, (err, result) => {
                if (err) {
                    response.statusCode = 500;
                    response.setHeader('Content-Type', 'application/json');
                    response.json({
                        status: 500,
                        message: "Error in updating subscription",
                        data: err
                    })
                }

                response.statusCode = 200;
                response.setHeader('Content-Type', 'application/json');
                response.json({
                    status: 200,
                    message: "Successfully updated subscription",
                    data: result
                })
            })
        })


    })

    .post(auth.verifyUser, auth.verifyAdmin, (request, response, next) => {
        // dari binotify app tambahin ke soap, sudah langsung dari app ke server
    })

module.exports = subsRouter