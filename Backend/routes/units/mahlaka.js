const express = require("express");
const router = express.Router();

const {
  findMahlakaByIdG,
  findAll,
  findMahlakaById,
  mahlakaByPlogaId,
  createMahlaka,
  updateMahlaka,
  updatePloga,
  removeMahlaka,
  mahlakaByHativaId,
  updateHativa,
  updateCountSoliders,
  updateCountWatches,
  updateCountWatchesUsed

} = require("../../controllers/units/mahlaka");

// find spec
router.get("/mahlaka/:id", findMahlakaByIdG);
router.get("/mahlaka", findAll);
router.post("/mahlaka/findMahlakaById", findMahlakaById);
router.post("/mahlaka/mahlakaByPlogaId", mahlakaByPlogaId);
router.post("/mahlaka/mahlakaByHativaId", mahlakaByHativaId);

//add
router.post("/mahlaka", createMahlaka); /**/

//update
router.put("/mahlaka/:mahlakaId", updateMahlaka);
router.post("/mahlaka/updatePloga/:mahlakaId", updatePloga);
router.post("/mahlaka/updateHativa/:mahlakaId", updateHativa);
router.post("/mahlaka/updateCountSoliders/:mahlakaId", updateCountSoliders);
router.post("/mahlaka/updateCountWatches/:mahlakaId", updateCountWatches);
router.post("/mahlaka/updateCountWatchesUsed/:mahlakaId", updateCountWatchesUsed);

//delete
router.delete("/mahlaka/:id", removeMahlaka);
module.exports = router;
