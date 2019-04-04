const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users'); // * check this later, could be source of an issue
// * may need secret key on options object? refer to dev connector

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

module.exports = passport => {
  passport.use(
    new JwtStrategy(options, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(nul, user);
          }
          return done(null, false);
        }).catch(err => console.log(err));
    })
  )
}