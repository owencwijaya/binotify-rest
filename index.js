const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const http = require('http');

const userRouter = require('./routes/userRouter');
const config = require('./config')

const HOST = '0.0.0.0';
const PORT = 3000;
const app = express();

const url = config.url;

const connect = mongoose.connect(url);
connect.then(() => {
  console.log("Connected to server!");
}, (err) => { console.log(err) })


app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

app.use('/users', userRouter);

const server = http.createServer(app);

server.listen(PORT, HOST, () => {
    console.log(`Server running at https://${HOST}:${PORT}`)
})