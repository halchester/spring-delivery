const mongoose = require("mongoose");
const shortid = require("shortid");
let Schema = mongoose.Schema;

const RiderModel = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  uniqueId: {
    type: String,
  },
  township: {
    type: Schema.Types.Array,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  availableShops: {
    type: Schema.Types.Array,
  },
});

RiderModel.pre("save", async function (next) {
  //generate a unique short code
  this.uniqueId = await shortid.generate();
  next();
});

module.exports = mongoose.model("Rider", RiderModel);
