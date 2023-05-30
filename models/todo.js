const mongoose = require("mongoose");
const { Schema } = mongoose;

const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ["todo", "inprogress", "done"],
    default: "todo",
  },
  userId:{
    type: Schema.Types.ObjectId,
    ref:'user',
    required:true
  }
});

const ToDo = mongoose.model("todo", todoSchema);
module.exports = ToDo;