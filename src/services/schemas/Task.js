const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tasks = new Schema({
  title: {
    type: String,
    required: [true, "Please set the task title!"],
    minLength: 2,
  },
  description: {
    type: String,
    required: [true, "Please set the task description!"],
    minLength: 2,
  },
  color: {
    type: String,
    default: null, // ! CHANGE DEFAULT
  },
  date: {
    type: String,
    default: null, // ! CHANGE DEFAULT
  },
  owner: {
    type: Schema.Types.ObjectId, // ! CHANGE OWNER
    ref: "Columns",
  },
});

const Tasks = mongoose.model("Tasks", tasks, "tasks");

module.exports = Tasks;
