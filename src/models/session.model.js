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
  company_signature: {
    type: String,
    default: "",
  },
  freelancer_signature: {
    type: String,
    default: "",
  },
});

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;
