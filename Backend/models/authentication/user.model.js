const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    personalnumber: { type: String, trim: true, unique: true, required: true },
    firstName: { type: String, trim: true, required: true, maxlength: 32 },
    lastLame: { type: String, trim: true, required: true },
    admin: { type: String, default: "0" }, // 0-regular user, 1-semi-admin(maneger) ,2-admin with edit permissons
    adminType: { type: String, default: "0" }, // 0-not admin, 1-inspector, ,2-admin
    // unit: String,
    // anaf: String,
    // mador: String,
    phoneNumber: String,
    email: {
      type: String,
      lowercase: true,
    },
    inspectionRequest: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
