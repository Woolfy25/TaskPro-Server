const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const column = new Schema({
  title: {
    type: String,
    required: [true, "Please set the column title!"],
    minLength: 2,
  },
  board: {
    type: Schema.Types.ObjectId,
    ref: "Board",
    required: true,
  },
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
});

const Columns = mongoose.model("Columns", column, "columns");

module.exports = Columns;
