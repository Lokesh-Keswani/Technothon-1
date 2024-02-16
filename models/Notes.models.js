const mongoose = require("mongoose");

const notesSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Notes = mongoose.model("Notes", notesSchema);

module.exports = Notes;
