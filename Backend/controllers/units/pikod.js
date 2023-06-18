const Pikod = require("../../models/units/pikod.model");
const router = require("express").Router();

exports.findPikodByIdG = (req, res) => {
  console.log(req.params.id);
  Pikod.findById(req.params.id)
    .then((request) => {
      console.log(request);
      res.json(request);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.findAll = (req, res) => {
  Pikod.find()
    .sort({ index: 1 })
    .then((pikods) => res.json(pikods))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.createPikod = (req, res) => {
  // console.log(req.body);
  const name = req.body.name;
  // const index = req.body.index;

  const pikod = new Pikod({ name });
  pikod.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};
exports.updatePikod = (req, res) => {
  // const index = req.body.index;
  // console.log(req.body);
  Pikod.findById(req.params.id)
    .then((request) => {
      request.name = req.body.name;
      // request.index = req.body.index;
      request
        .save()
        .then(() => res.json(`Ploga updated!`))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.removePikod = (req, res) => {
  Pikod.findByIdAndDelete(req.params.id)
    .then((pikods) => res.json(pikods))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.findPikodByIdP = (req, res) => {
  Pikod.findById(req.body.id)
    .then((request) => {
      console.log(request);
      res.json(request);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

// exports.updateOgda = (req, res) => {
//   Pikod.updateOne({ _id: req.body[0] }, { ogda: req.body[1] })
//     .then((orders) => res.json(orders))
//     .catch((err) => res.status(400).json("Error: " + err));
//   // console.log(req.body);
// };
