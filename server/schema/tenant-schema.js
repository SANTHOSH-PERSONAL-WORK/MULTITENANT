const { Schema, model } = require("mongoose");

const tenantSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    domain: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    dbURI: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { collection: "tenantInfo", timestamps: true }
);

module.exports = model("tenantInfo", tenantSchema);