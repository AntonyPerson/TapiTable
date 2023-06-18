const mongoose = require("mongoose");

const PikodSchema = new mongoose.Schema({
  name: { type: String },
  index: { type: Number },
});

module.exports = mongoose.model("Pikod", PikodSchema);
