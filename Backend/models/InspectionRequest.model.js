const mongoose = require("mongoose");
// const user = require("./user.model");

//user_cars is the cadr id that was used to conect to the computer when the order was made
const InspectionRequest = new mongoose.Schema(
  {
    // email: String,
    // fullName: String,
    // workName: String,
    inspectionByType: { type: Number, required: true },
    inspectedName: { type: String, required: true },

    visited: { type: Number, required: true },
    visitedName: { type: String, required: true },

    dateOfInspection: { type: Date, required: true },
    status: { type: Number, default: 25 },

    personalnumber: { type: String, required: true },

    //! inspection data
    results: { type: String, default: "" },
    improvments: { type: String, default: "" },
    keeping: { type: String, default: "" },

    grade: { type: Number, default: 0 },

    inspectorsPersonalnumber: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("InspectionRequest", InspectionRequest);
