const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const columns = new Schema({
  title: {
    type: String,
    required: [true, "Please set the column title!"],
    minLength: 2,
  },
  owner: {
    type: Schema.Types.ObjectId, // ! CHANGE OWNER
    ref: "Boards",
  },
});

const Columns = mongoose.model("Columns", columns, "columns");

module.exports = Columns;
