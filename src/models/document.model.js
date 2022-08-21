const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const documentSchema = new Schema(
  {
    sender_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reciever_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    file_url: String,
    type: String,
  },
  { timestamps: true }
);

const Document = mongoose.model("Document", documentSchema);

module.exports = Document;
