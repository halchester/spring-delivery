const riderController = require("../controllers/rider.controller");
const router = require("express").Router();

router.post("/api/rider", riderController.registerNewRider);
router.get("/api/rider/:id", riderController.getOneRider);
router.get("/api/riders", riderController.getAllRiders);
router.delete("/api/rider/:id", riderController.deleteRider);
router.put("/api/rider/:id", riderController.editRider);

module.exports = router;
