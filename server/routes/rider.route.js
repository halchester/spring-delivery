const riderController = require("../controllers/rider.controller");
const router = require("express").Router();

router.post("/api/rider", riderController.registerNewRider);

module.exports = router;
