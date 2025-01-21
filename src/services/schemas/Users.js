const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const user = new Schema({
  email: {
    type: String,
    required: [true, "Please set email"],
    minLength: 2,
  },
  password: {
    type: String,
    required: [true, "Please set password"],
    minLength: 2,
  },
  name: {
    type: String,
    required: [true, "Please set Username"],
    minLength: 2,
  },
  picture: {
    type: String,
    default: null,
  },
  theme: {
    type: String,
    default: null,
  },
  token: {
    type: String,
    default: null,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: function () {
      return !this.verify;
    },
  },
});

user.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(5));
};

user.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("User", user, "users");

module.exports = User;
