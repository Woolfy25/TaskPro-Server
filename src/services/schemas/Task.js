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
    default: null,
  },
  date: {
    type: String,
    default: null,
  },
  column: {
    type: Schema.Types.ObjectId,
    ref: "Column",
    required: true,
  },
});

const Tasks = mongoose.model("Tasks", tasks, "tasks");

module.exports = Tasks;
