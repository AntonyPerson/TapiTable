const Ogda = require("../../models/units/ogda.model");

exports.findOgdaByIdG = (req, res) => {
  console.log(req.params.id);
  Ogda.findById(req.params.id)
    .then((request) => {
      console.log(request);
      res.json(request);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.findAll = (req, res) => {
  Ogda.find()
    .sort({ index: 1 })
    .then((ogdot) => res.json(ogdot))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.findOgdaByIdP = (req, res) => {
  Ogda.Ogda.findById(req.body.id)
    .then((job) => res.json(job))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.ogdotByPikodId = (req, res) => {
  Ogda.find({ pikod: req.body.pikod })
    .sort({ index: 1 })
    .then((orders) => res.json(orders))
    .catch((err) => res.status(400).json("Error: " + err));
  // console.log(req.body);
};

exports.createOgda = (req, res) => {
  // console.log(req.body);
  const name = req.body.name;
  const pikod = req.body.pikod;
  // const index = req.body.index;

  const ogda = new Ogda({ name, pikod });
  ogda.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};

exports.updateOgda = (req, res) => {
  // const index = req.body.index;
  // console.log(req.body);
  Ogda.findById(req.params.id)
    .then((request) => {
      request.name = req.body.name;
      request.pikod = req.body.pikod;
      // request.index = req.body.index;
      request
        .save()
        .then(() => res.json(`Ogda updated!`))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.updatePikod = (req, res) => {
  // const index = req.body.index;
  // console.log(req.body);
  Ogda.findById(req.params.id)
    .then((request) => {
      request.pikod = req.body.pikod;
      // request.index = req.body.index;
      request
        .save()
        .then(() => res.json(`Ogdas pikod was updated!`))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.removeOgda = (req, res) => {
  Ogda.findByIdAndDelete(req.params.id)
    .then((ogdot) => res.json(ogdot))
    .catch((err) => res.status(400).json("Error: " + err));
};

// exports.updatehativas = (req, res) => {
//   Ogda.updateOne({ _id: req.body[0] }, { hativa: req.body[1] })
//     .then((orders) => res.json(orders))
//     .catch((err) => res.status(400).json("Error: " + err));
//   // console.log(req.body);
// };
