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
} = require("../../controllers/systemAlerts/generalAlerts");

// find spec
router.get("/systemAlerts/general", findAll);
router.get("/systemAlerts/general/:id", findAlertByID);
router.post("/systemAlerts/general/findAllByType/:type", findAllByType);
router.post(
  "/systemAlerts/general/alertsByPersonalnumber/:personalnumber",
  alertsByPersonalnumber
);

//add
router.post("/systemAlerts/general/add", add);

//update
router.put("/systemAlerts/general/update/:id", updateGdod);
router.post("/systemAlerts/general/update/updateHativa", updatehativa);

//delete
router.delete("/systemAlerts/general/remove/:id", updateAlertByID);

module.exports = router;
