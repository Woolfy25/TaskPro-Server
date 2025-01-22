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
    type: Schema.Types.ObjectId, // TODO CHANGE OWNER
    ref: "User",
  },
  columns: [
    {
      type: Schema.Types.ObjectId,
      ref: "Columns",
    },
  ],
});

const Boards = mongoose.model("Boards", boards, "boards");

module.exports = Boards;
