const express = require("express");
const router = express.Router();

const {
  findAll,
  findAllByType,
  add,
  alertsByPersonalnumber,
  findAlertByID,
  deleteAlertByID,
  updateAlertByID,
} = require("../controllers/SystemAlerts");

// find spec
router.get("/", findAll);
router.get("/:id", findAlertByID);
router.post("/findAllByType/:type", findAllByType);
router.post("/alertsByPersonalnumber/:personalnumber", alertsByPersonalnumber);

//add
router.post("/add", add);

//update
router.post("/update/updateAlertByID/:id", updateAlertByID);

//delete
router.delete("/remove/:id", deleteAlertByID);

module.exports = router;
