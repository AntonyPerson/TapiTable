const express = require("express");
const router = express.Router();

const {
  findPlogaByIdG,
  findAll,
  findPlogaByIdP,
  plogaByGdodId,
  createPloga,
  updatePloga,
  updateGdod,
  removeGdod,
  plogaByHativaId,
  updateHativa,
} = require("../../controllers/units/ploga");

// find spec
router.get("/ploga/:id", findPlogaByIdG);
router.get("/ploga", findAll);
router.post("/ploga/PlogaByIdP", findPlogaByIdP);
router.post("/ploga/plogaByGdodId", plogaByGdodId);
router.post("/ploga/plogaByHativaId", plogaByHativaId);

//add
router.post("/ploga/add", createPloga); /**/

//update
router.put("/ploga/update/:id", updatePloga);
router.post("/ploga/update/updatGdod", updateGdod);
router.post("/ploga/update/updateHativa", updateHativa);

//delete
router.delete("/ploga/remove/:id", removeGdod);

module.exports = router;
