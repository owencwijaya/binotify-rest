const bodyParser = require("body-parser");
const express = require("express");
const soap = require("soap");
const dotenv = require("dotenv");
dotenv.config();

const auth = require("../auth");

// ini buat nerusin request ke soap
const subsRouter = express.Router().use(bodyParser.json());
const api_key = process.env.SOAP_API_KEY;

// user binotify premium meminta list request subscription
subsRouter.route( '/')
    .get(auth.verifyUser, auth.verifyAdmin, (request, response, next) => {
        // minta ke soap
        const soapURL = `${process.env.SOAP_HOST}/subscription/getSubs?wsdl`
        console.log(soapURL);
        soap.createClient(soapURL, {}, (err, client) => {
            if (err || client === null || client === undefined) {
                console.log(client)
                response.statusCode = 500;
                response.setHeader('Content-Type', 'application/json');
                response.json({
                    status: 500,
                    message: "Error in connecting to SOAP client",
                    data: err.message
                })
                return;
            }

            let page = request.query.page;
            let limit = request.query.limit;

            console.log(client.describe())
            client.getSubs({
                api_key: api_key,
                page: page,
                limit: limit
            }, (err, result) => {
                console.log(err)
                if (err !== null) {
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
                    message: "Successfully retrieved subscription list",
                    data: result.return["subscription-lists"].subscription               
                })
            })
        })
    })

    .put(auth.verifyUser, auth.verifyAdmin, (request, response, next) => {
        // update status ACCEPTED / REJECTED
        // dari react ngirim creator_id, subscriber_id, ama status 'ACCEPTED' ato 'REJECTED'
        // minta ke soap
        const soapURL = `${process.env.SOAP_HOST}/subscription/updateSubs?wsdl`
        soap.createClient(soapURL, {}, (err, client) => {
            if (err !== null) {
                response.statusCode = 500;
                response.setHeader('Content-Type', 'application/json');
                response.json({
                    status: 500,
                    message: "Error in connecting to SOAP client",
                    data: err
                })
            }

            const user_id = request.user._id.valueOf();
            const creator_id = request.body.creator_id;
            const subscriber_id = request.body.subscriber_id;
            const new_status = request.body.new_status;


            client.updateSubs({
                api_key: api_key,
                user_id: user_id,
                creator_id: creator_id,
                subscriber_id: subscriber_id,
                new_status: new_status
            }, (err, result) => {
                console.log(err, result);
                console.log(result.return);
                if (err !== null || result.return !== "Success") {
                    // response.statusCode = 500;
                    response.setHeader('Content-Type', 'application/json');
                    response.json({
                        status: 500,
                        message: "Error in updating subscription",
                        data: err
                    })
                } else {
                    response.statusCode = 200;
                    response.setHeader('Content-Type', 'application/json');
                    response.json({
                        status: 200,
                        message: "Successfully updated subscription",
                        data: result     
                    })
                }
            })
        })


    })

module.exports = subsRouter
