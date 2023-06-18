const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const hativaSchema = new mongoose.Schema({
  name: { type: String },
  ogda: { type: String },
  index: { type: Number },
});

const Hativa = mongoose.model("Hativa", hativaSchema);

module.exports = Hativa;
