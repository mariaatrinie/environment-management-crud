const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
  area: {
    type: String,
    required: true
  },
  issueType: {
    type: String,
    required: true
  },
  description: String,
  severity: String,
  status: {
    type: String,
    default: "Open"
  }
});

module.exports = mongoose.model("Issue", issueSchema);
