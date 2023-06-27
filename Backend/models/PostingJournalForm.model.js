const mongoose = require("mongoose");
// const user = require("./user.model");

//user_cars is the cadr id that was used to conect to the computer when the order was made
const PostingJournalForm = new mongoose.Schema(
  {
    email: String,
    fullName: String,
    workName: String,
    status: { type: Number, default: 25 },

    personalnumber: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PostingJournalForm", PostingJournalForm);
