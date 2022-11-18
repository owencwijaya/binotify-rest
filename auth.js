const LocalStrategy = require('passport-local').Strategy;

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const jwt = require('jsonwebtoken');
const passport = require('passport');
const dotenv = require('dotenv');
dotenv.config();

passport.use(new LocalStrategy)

exports.getToken = (user) => {
    return jwt.seign(user, process.env.JWT_SECRET, {expiresIn: 3600})
}

var options = {};
options.jwtFromReq = ExtractJwt.fromAuthHeaderAsBearerToken();
options.jwtSecret = process.env.JWT_SECRET;

exports.verifyUser = passport.authenticate('jwt', {session: false});

exports.verifyAdmin = (request, response, next) => {
    if (request.user.admin) {
        next();
    }

    const error = new Error('This user is not an admin')
    error.status = 401;
    return next(error);
}