const cloudinary = require('cloudinary').v2;
// const multer = require('multer');
const Rider = require('../models/Rider');

exports.registerNewRider = async (req, res) => {
  try {
    const {
      name,
      state,
      township,
      availableShops,
      phoneNumber,
      detail,
      picURL,
      expectedMoney,
    } = req.body;
    const payload = {
      name,
      state,
      township,
      phoneNumber,
      availableShops,
      detail,
      picURL,
      expectedMoney,
    };
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
    .catch(() => {
      res.status(400).json({ success: false, data: {} });
    });
};

exports.getOneRider = async (req, res) => {
  const { id } = req.params;
  await Rider.findOne({ uniqueId: id })
    .then((data) => {
      res.status(200).json({ success: true, data });
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
  const { id } = req.params;
  await Rider.updateOne(
    { uniqueId: id },
    {
      $set: { ...req.body },
    },
    { new: true },
  )
    .then((data) => res.status(200).json({ success: true, data }))
    .catch((err) => res.status(200).json({ success: false, data: err }));
};

const cloudinaryConfig = {
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
};

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, 'public');
//   },
//   filename(req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const upload = multer({ storage }).single('file');

exports.uploadRiderImage = async (req, res) => {
  try {
    const filePath = req.file;

    const uploadImage = new Promise((resolve) => {
      cloudinary.config(cloudinaryConfig);
      cloudinary.uploader
        .upload(filePath.path, {
          folder: 'spring_delivery',
          unique_filename: true,
        })
        .then((result) => {
          const imageUrl = result.secure_url;
          return resolve(imageUrl);
        })
        .catch((err) => err);
    });

    const image = await uploadImage;
    return res.status(200).json({ success: true, data: image });
  } catch (err) {
    console.log('error', err);
    return res.status(500).json({ success: true, data: {} });
  }
};
