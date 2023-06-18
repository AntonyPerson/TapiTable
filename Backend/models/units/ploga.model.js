const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const plogaSchema = new mongoose.Schema({
  name: { type: String },
  gdod: { type: String },
  hativa: { type: String },
  index: { type: Number },
  // sadir:{type:String},
});

const Ploga = mongoose.model("Ploga", plogaSchema);

module.exports = Ploga;
