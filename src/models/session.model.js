const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const sessionSchema = new Schema({
  creator_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  project_id: {
    type: Schema.Types.ObjectId,
    ref: "Project",
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  state: String,
  date: Date,
  end_date: Date,
});

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;
