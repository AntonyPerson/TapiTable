const express = require("express");
const router = express.Router();

const {
  findOgdaByIdG,
  findAll,
  findOgdaByIdP,
  ogdotByPikodId,
  createOgda,
  updateOgda,
  updatePikod,
  removeOgda, 

} = require("../../controllers/units/ogda");

// find spec tipul
router.get("/ogda/:id", findOgdaByIdG);
router.get("/ogda", findAll);
router.post("/ogda/findOgdaById", findOgdaByIdP);
router.post("/ogda/ogdotByPikodId", ogdotByPikodId);

//add pikod
router.post("/ogda/add", createOgda);

//update pikod
router.put("/ogda/update/:id", updateOgda);
router.post("/ogda/update/updatePikod", updatePikod);

//delete pikod
router.delete("/ogda/remove/:id", removeOgda);

// router.post("/ogda/updatehativas", updatehativas);
module.exports = router;
