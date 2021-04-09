const Rider = require("../models/Rider");

exports.registerNewRider = async (req, res) => {
  try {
    const { name, township, availableShops, phoneNumber } = req.body;
    const payload = { name, township, phoneNumber, availableShops };
    const newRider = new Rider(payload);
    await newRider.save();
    return res
      .status(200)
      .json({ success: true, data: newRider, id: newRider.uniqueId });
  } catch (err) {
    console.log(err);
    return res.status(200).json({ success: false, data: {} });
  }
};
