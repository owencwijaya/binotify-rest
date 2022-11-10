const express = require('express');
const morgan = require('morgan');
const http = require('http');


const HOST = '0.0.0.0';
const PORT = 3000;
const app = express();


app.use("/", (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html')
    res.end(`
        <html>
            <body>
                <h1>Ini jalan ga cok</h1>
            </body>
        </html>
    `)
});

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

const server = http.createServer(app);

const conn = require('./db/connect.js')

server.listen(PORT, HOST, () => {
    console.log(`Server running at https://${HOST}:${PORT}`)
})