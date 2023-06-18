const express = require("express");
const router = express.Router();

const {
  findAll,
  findPikodByIdG,
  createPikod,
  updatePikod,
  removePikod,
  findPikodByIdP,
  // updateOgda,
} = require("../../controllers/units/pikod");

// find spec tipul
router.get("/pikod", findAll);
router.get("/pikod/:id", findPikodByIdG);
//add pikod
router.post("/pikod/add", createPikod); /**/
//update pikod
router.put("/pikod/update/:id", updatePikod);
//delete pikod
router.delete("/pikod/remove/:id", removePikod);

router.post("/pikod/PikodById", findPikodByIdP);

// router.post("/pikod/updateOgda", updateOgda);

module.exports = router;
