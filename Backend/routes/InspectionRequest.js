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

router.route("/remove/:id").delete((req, res) => {
  InspectionRequest.findByIdAndDelete(req.params.id)
    .then(() => res.json("InspectionRequest deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  InspectionRequest.findById(req.params.id)
    .then((request) => {
      request.personalnumber = req.body.personalnumber;

      request.inspectionByType = req.body.inspectionByType;
      request.inspectedName = req.body.inspectedName;
      request.visited = req.body.visited;
      request.visitedName = req.body.visitedName;
      request.dateOfInspection = Date.parse(req.body.dateOfInspection);
      request.status = Number(req.body.status);

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
      request.status = Number(req.body.status);
      request.dateOfInspection = Date.parse(req.body.dateOfInspection);

      request
        .save()
        .then(() => res.json("InspectionRequest updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/statusUpdate/:id").post((req, res) => {
  // console.groupCollapsed(`handleStatusChange -------- Axios.then`);
  // console.log(req.params.id);

  InspectionRequest.findById(req.params.id)
    .then((request) => {
      request.status = Number(req.body.status);

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
