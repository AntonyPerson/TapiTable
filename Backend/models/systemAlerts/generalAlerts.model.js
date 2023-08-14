const mongoose = require("mongoose");
// const user = require("./user.model");

//user_cars is the cadr id that was used to conect to the computer when the order was made
const GeneralAlerts = new mongoose.Schema(
  {
    Title: { type: String, required: true },
    body: { type: String, required: true },
    date: { type: Date, required: true, default: () => Date.now() },

    type: { type: String, required: true, default: "system" }, //? can be: system, god_admon, general
    experationPeriod: { type: Number, required: true, default: 7 },

    personalnumber: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PostingJournalForm", PostingJournalForm);
