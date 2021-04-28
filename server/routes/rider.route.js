const router = require('express').Router();
const multer = require('multer');
const riderController = require('../controllers/rider.controller');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/spring_delivery');
  },
  filename: (req, file, cb) => {
    if (!file) {
      cb(null, false);
    } else {
      cb(null, file.originalname);
    }
  },
});

const uploadStore = multer({
  storage,
});

router.post('/api/rider', riderController.registerNewRider);
router.get('/api/riders', riderController.getAllRiders);
router.get('/api/rider/:id', riderController.getOneRider);
router.delete('/api/rider/:id', riderController.deleteRider);
router.put('/api/rider/:id', riderController.editRider);
router.post(
  '/api/rider/upload',
  uploadStore.single('file'),
  riderController.uploadRiderImage,
);
module.exports = router;
