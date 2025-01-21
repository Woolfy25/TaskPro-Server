const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const boards = new Schema({
  title: {
    type: String,
    required: [true, "Please set the board title!"],
    minLength: 2,
  },
  icon: {
    type: String,
    default: null, // ! CHANGE DEFAULT
  },
  background: {
    type: String,
    default: null, // ! CHANGE DEFAULT
  },
  owner: {
    type: Schema.Types.ObjectId, // ! CHANGE OWNER
    ref: "User",
  },
});

const Boards = mongoose.model("Boards", boards, "boards");

module.exports = Boards;
