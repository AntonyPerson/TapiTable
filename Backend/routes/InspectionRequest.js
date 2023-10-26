/* eslint-disable prefer-template */
/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
const router = require("express").Router();
const InspectionRequest = require("../models/InspectionRequest.model");
// const referenceId = 1;

router.route("/").get((req, res) => {
  InspectionRequest.find()
    .sort({ status: 1, createdAt: -1 })
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/activeRequests").get((req, res) => {
  InspectionRequest.find({ status: { $lte: 100 } })
    .sort({ createdAt: -1 })
    .exec()
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/archivedRequests").get((req, res) => {
  InspectionRequest.find({ status: { $gte: 125 } })
    .sort({ createdAt: -1 })
    .exec()
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/getCountStatus").get((req, res) => {
  let received = 0;
  let inWorking = 0;
  let inprint = 0;
  let readyForTakeIn = 0;
  // let archive = 0;
  InspectionRequest.find()
    .then((request) =>
      //  res.json(request)
      {
        request.map((hozla) => {
          if (hozla.status === 25) {
            received += 1;
          } else if (hozla.status === 50) {
            inWorking += 1;
          } else if (hozla.status === 75) {
            inprint += 1;
          } else if (hozla.status === 100) {
            readyForTakeIn += 1;
          }
          // else if (hozla.status === 125) {
          //   archive += 1;
          // }
        });
        // console.log(`received: ${received}`);
        // console.log(`inprint: ${inprint}`);
        // console.log(`ended: ${ended}`);
        // console.log(`readyForTakeIn: ${readyForTakeIn}`);
        // console.log(`archive: ${archive}`);
      }
    )
    .then(() => res.json({ received, inWorking, inprint, readyForTakeIn }))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const personalnumber = req.body.personalnumber;

  const inspectionByType = req.body.inspectionByType;
  const inspectedName = req.body.inspectedName;

  const visited = req.body.visited;
  const visitedName = req.body.visitedName;

  const dateOfInspection = req.body.dateOfInspection;
  const status = req.body.status;

  const newInspectionRequest = new InspectionRequest({
    personalnumber,
    inspectionByType,
    inspectedName,
    visited,
    visitedName,
    dateOfInspection,
    status,
  });

  const formId = newInspectionRequest.save((err, form) => {
    if (err) {
      return res.status(400).json("Error: " + err);
    } else {
      res.send(form.id);
    }
  });
});

router.route("/requestByPersonalnumber/:personalnumber").get((req, res) => {
  // console.log(req.body);
  // console.log(req.params);
  const personalnumber = req.params.personalnumber;
  // const personalnumber = "7654321";
  InspectionRequest.find({ personalnumber: personalnumber })
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
});

router
  .route("/requestByPersonalnumberInspector/:inspectorsPersonalnumber")
  .get((req, res) => {
    // console.log(req.body);
    // console.log(req.params);
    const inspectorsPersonalnumber = req.params.inspectorsPersonalnumber;
    // const personalnumber = "7654321";
    InspectionRequest.find({
      inspectorsPersonalnumber: inspectorsPersonalnumber,
    })
      .then((request) => res.json(request))
      .catch((err) => res.status(400).json("Error: " + err));
  });
router.route("/:id").get((req, res) => {
  InspectionRequest.findById(req.params.id)
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  InspectionRequest.findByIdAndDelete(req.params.id)
    .then(() => res.json("InspectionRequest deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  InspectionRequest.findById(req.params.id)
    .then((request) => {
      request.typeRequest = req.body.typeRequest;
      request.user_card_number = req.body.user_card_number;
      request.forTypePrint = req.body.forTypePrint;
      request.unit = req.body.unit;
      request.anaf = req.body.anaf;
      request.mador = req.body.mador;
      request.phoneNumber = req.body.phoneNumber;
      request.workName = req.body.workName;
      request.workClearance = req.body.workClearance;
      request.bindingType = req.body.bindingType;
      request.bindingTypeOther = req.body.bindingTypeOther;
      request.copyType = req.body.copyType;
      request.pageType = req.body.pageType;
      request.numOfCopyies = Number(req.body.numOfCopyies);
      request.fullNameAsker = req.body.fullNameAsker;
      request.workGivenDate = Date.parse(req.body.workGivenDate);
      request.fullNameReciver = req.body.fullNameReciver;
      request.fullNameTakein = req.body.fullNameTakein;
      request.workRecivedDate = Date.parse(req.body.workRecivedDate);
      request.files_id = req.body.files_id;
      request.clientNote = String(req.body.clientNote);
      request.status = req.body.status;
      request.toraHeilitVolumes = req.body.toraHeilitVolumes;
      request.personalnumber = req.body.personalnumber;
      request.propPrints = req.body.propPrints;

      request
        .save()
        .then(() => res.json("InspectionRequest updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/updateNameReciver/:id").post((req, res) => {
  InspectionRequest.findById(req.params.id)
    .then((request) => {
      request.fullNameReciver = req.body.fullNameReciver;
      request
        .save()
        .then(() => res.json("InspectionRequest updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/updateSammary/:id").post((req, res) => {
  InspectionRequest.findById(req.params.id)
    .then((request) => {
      request.results = req.body.results;
      request.improvments = req.body.improvments;
      request.keeping = req.body.keeping;
      request.grade = req.body.grade;
      request.inspectorsPersonalnumber = req.body.inspectorsPersonalnumber;

      request
        .save()
        .then(() => res.json("InspectionRequest updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/updateNumVolume/:id").post((req, res) => {
  InspectionRequest.findById(req.params.id)
    .then((request) => {
      request.toraHeilitVolumes = req.body.toraHeilitVolumes;
      request
        .save()
        .then(() => res.json("InspectionRequest updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/sameRequest/:id").get((req, res) => {
  const getDaysDiff = (dateToCheck) => {
    const day = new Date().getDate();
    const mounth = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const currentDate = Date.parse(`${year}-${mounth}-${day}`);

    // console.log(dateToCheck);
    // console.log(`${year}-${mounth}-${day}`);
    // console.log(currentDate);
    // console.log(Date.parse(dateToCheck));
    const diff =
      Math.abs(currentDate - Date.parse(dateToCheck)) / (1000 * 3600 * 24);
    // console.log(diff);
    return diff;
  };
  // let message = "";
  // var unit = "";
  InspectionRequest.findById(req.params.id)
    .then((request) => {
      const unitName = request.unit;
      const dataToraHeilit = request.toraHeilitVolumes;
      const day = request.workGivenDate.getDate();
      const mounth = request.workGivenDate.getMonth() + 1;
      const year = request.workGivenDate.getFullYear();
      const dateSent = Date.parse(`${year}-${mounth}-${day}`);

      let message = false;
      // console.log(unitName);
      // console.log(dataToraHeilit);
      InspectionRequest.find({
        unit: unitName,
        toraHeilitVolumes: dataToraHeilit,
      })
        .then((requestData) => {
          requestData.map((tora) => {
            const day = tora.workGivenDate.getDate();
            const mounth = tora.workGivenDate.getMonth() + 1;
            const year = tora.workGivenDate.getFullYear();
            const dateTora = Date.parse(`${year}-${mounth}-${day}`);
            const diff =
              Math.abs(dateSent - Date.parse(tora.workGivenDate)) /
              (1000 * 3600 * 24);
            if (
              // tora.toraHeilitVolumes === dataToraHeilit &&
              tora.id !== req.params.id &&
              dateTora <= dateSent &&
              diff <= 365
            ) {
              console.log("Same Data");
              console.log(diff);
              // unit = tora.unit;
              message = true;
            }
          });
          console.log(dateSent);

          {
            message === true
              ? res.json({ message: "בקשה זו כבר נשלחה בשנה האחרונה" })
              : res.json({ message: "" });
          }
          // console.log(`received: ${received}`);
          // console.log(`inprint: ${inprint}`);
          // console.log(`ended: ${ended}`);
          // console.log(`readyForTakeIn: ${readyForTakeIn}`);
          // console.log(`archive: ${archive}`);
        })
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/statusUpdate/:id").post((req, res) => {
  // console.groupCollapsed(`handleStatusChange -------- Axios.then`);
  // console.log(req.params.id);

  InspectionRequest.findById(req.params.id)
    .then((request) => {
      // console.log(request.status);
      request.status = Number(req.body.status);
      // console.log(request.status);
      // console.log(req.body.status);
      // if (req.body.status >= 125) {
      //   request.files_id = "";
      // }
      request
        .save()
        .then(() => res.json("InspectionRequest status updated!"))
        .catch((err) => {
          // console.log(err);

          res.status(400).json("Error: " + err);
        });
    })
    .catch((err) => res.status(400).json("Error: " + err));
  console.groupEnd();
});

module.exports = router;
