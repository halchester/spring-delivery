const Rider = require("../models/Rider");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

exports.registerNewRider = async (req, res) => {
  try {
    const {
      name,
      township,
      availableShops,
      phoneNumber,
      detail,
      picURL,
    } = req.body;
    const payload = {
      name,
      township,
      phoneNumber,
      availableShops,
      detail,
      picURL,
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
  const { id } = req.params;
  await Rider.updateOne(
    { uniqueId: id },
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

let cloudinaryConfig = {
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
};

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

let upload = multer({ storage: storage }).single("file");

exports.uploadRiderImage = async (req, res) => {
  try {
    let filePath = req.file;

    const uploadImage = new Promise((resolve, reject) => {
      cloudinary.config(cloudinaryConfig);
      cloudinary.uploader
        .upload(filePath.path, {
          folder: "spring_delivery",
          unique_filename: true,
        })
        .then((result) => {
          let imageUrl = result.secure_url;
          return resolve(imageUrl);
        })
        .catch((err) => err);
    });

    let image = await uploadImage;
    return res.status(200).json({ success: true, data: image });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: true, data: {} });
  }

  // cloudinary.uploader
  //   .upload(filePath.path, {
  //     folder: "spring_delivery",
  //     unique_filename: true,
  //   })
  //   .then((result) => {
  //     let imageUrl = result.secure_url;
  //     return res.status(200).json({ success: true, data: imageUrl });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};;
