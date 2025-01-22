require("dotenv").config();

const passportJWT = require("passport-jwt");
const passport = require("passport");
const User = require("../services/schemas/Users");

const secret = process.env.JWT_SECRET;

const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;

const params = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(params, function (payload, done) {
    User.find({ email: payload.email })
      .then(([user]) => {
        if (!user) {
          return done(new Error("User does not exist!"));
        }
        return done(null, user);
      })
      .catch((error) => done(error));
  })
);
