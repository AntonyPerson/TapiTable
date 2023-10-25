const mongoose = require("mongoose");
// const user = require("./user.model");

//user_cars is the cadr id that was used to conect to the computer when the order was made
const SystemAlertsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    // date: { type: Date, default: () => Date.now() },

    /* //? can be:
      ? general(all users): 00
      ? inspector: 11
      ? admin: 12
      ? GOD admin: 22
      ! Alert: 99
    */
    type: { type: String, required: true, default: "00" },
    // experationPeriod: { type: Number, required: true, default: 7 },

    personalnumber: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SystemAlerts", SystemAlertsSchema);
