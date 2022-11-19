const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const mongoose = require('mongoose');
const http = require('http');
const passport = require('passport');

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
const userRouter = require('./routes/userRouter');


const app = express();
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

const url = config.url;
const connect = mongoose.connect(url);
console.log(url)
connect.then(() => {
  console.log("Connected to server!");
  console.log("Inserting admin credentials for BiNotify premium");

  const adminUser = {
    email: "admin@binotify.com",
    password: "admin",
    username: "admin",
    name: "Admin",
    admin: true
  }

  User.register(new User(adminUser), adminUser.password, (error, _) => {
    if (error){
      throw(error);
    }

    console.log("Successfully added admin user!");
  })
}, (err) => { console.log(err) })

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
app.use('/user', userRouter);

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