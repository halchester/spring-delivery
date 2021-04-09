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
    return res.status(500).json({ success: false, data: {} });
  }
};

exports.getAllRiders = async (req, res) => {
  await Rider.find()
    .sort({ createdAt: -1 })
    .then((response) => res.status(200).json({ success: true, data: response }))
    .catch((err) => {
      res.status(400).json({ success: false, data: {} });
    });
};

exports.getOneRider = async (req, res) => {
  const { id } = req.params;
  const rider = Rider.findOne({ uniqueId: id })
    .then((data) => {
      res.status(200).json({ success: true, data: data });
    })
    .catch((err) => res.status(400).json({ success: false, data: err }));
};

exports.deleteRider = async (req, res) => {
  const { id } = req.params;
  await Rider.findOneAndDelete({ uniqueId: id })
    .then((response) => res.status(200).json({ success: true, data: response }))
    .catch((err) => res.status(200).json({ success: false, data: err }));
};

exports.editRider = async (req, res) => {
  const { uniqueId } = req.body;
  await Rider.updateOne(
    { uniqueId: uniqueId },
    {
      $set: { ...req.body },
    },
    { new: true }
  )
    .then((data) => {
      return res.status(200).json({ success: true, data: data });
    })
    .catch((err) => res.status(200).json({ success: false, data: err }));
};
