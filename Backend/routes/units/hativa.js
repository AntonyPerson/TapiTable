const express = require("express");
const router = express.Router();

const {
  findHativaByIdG,
  findAll,
  findHativaByIdP,
  hativasByOgdaId,
  createHativa,
  updateHativa,
  removeHativa,
  updateOgda,
} = require("../../controllers/units/hativa");

// find spec tipul
router.get("/hativa/:id", findHativaByIdG);
router.get("/hativa", findAll);
router.post("/hativa/hativaById", findHativaByIdP);
router.post("/hativa/hativasbyogdaid", hativasByOgdaId);

//add hativa
router.post("/hativa/add", createHativa);

//updates
router.put("/hativa/update/:id", updateHativa);
router.post("/hativa/updateogda", updateOgda);

//delete hativa
router.delete("/hativa/remove/:id", removeHativa);

// router.post("/hativa/updategdods", updategdods);

module.exports = router;
