const mongoose = require('mongoose');
const shortid = require('shortid');

const { Schema } = mongoose;

const RiderModel = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  detail: {
    type: String,
    required: true,
  },
  expectedMoney: {
    type: Number,
    required: true,
  },
  picURL: {
    type: String,
    required: true,
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
  uniqueId: {
    type: String,
  },
});

RiderModel.pre('save', async function (next) {
  // generate a unique short code
  this.uniqueId = await shortid.generate();
  next();
});

module.exports = mongoose.model('Rider', RiderModel);
