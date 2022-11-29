const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const mongoose = require('mongoose');
const http = require('http');
const passport = require('passport');
const cors = require("cors");


const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200
}

const dotenv = require('dotenv');
dotenv.config();

const cookieParser = require('cookie-parser');
const FileStore = require('session-file-store')(session);


const config = require('./config');
const User = require('./schema/user');

const HOST = '0.0.0.0';
const PORT = 3000;

const authRouter = require('./routes/authRouter');
const songRouter = require('./routes/songRouter');
const subsRouter = require('./routes/subsRouter');
const userRouter = require('./routes/userRouter');
const validateRouter = require('./routes/validateRouter');

const app = express();
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(cors(corsOptions));

const url = config.url;
const connect = mongoose.connect(url);
console.log(url)

connect.then(() => {
  console.log("Connected to server!");

  // User.find({}).then((users) => {
  //   users.forEach((user) => {
  //     User.register(new User(user), user.password)
  //   })
  // })
})



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(config.JWT_SECRET));
app.use(session({
  name: 'session-id',
  secret: process.env.JWT_SECRET,
  saveUninitialized: false,
  resave: false,
  store: new FileStore()
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);
app.use('/song', songRouter);
app.use('/subs', subsRouter);
app.use('/user', userRouter);
app.use('/validate', validateRouter);

app.use("/", (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html')
  res.end(`
      <html>
          <body>
              <h1>REST Endpoint for BiNotify Premium</h1>
          </body>
      </html>
  `)
});


const server = http.createServer(app);

server.listen(PORT, HOST, () => {
    console.log(`Server running at https://${HOST}:${PORT}`)
})