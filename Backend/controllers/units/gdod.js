const Gdod = require("../../models/units/gdod.model");

exports.findGdodByIdG = async (req, res) => {
  console.log(req.params.id);
  Gdod.findById(req.params.id)
    .then((request) => {
      console.log(request);
      res.json(request);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.findAll = (req, res) => {
  Gdod.find()
    .sort({ index: 1 })
    .then((gdod) => res.json(gdod))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.findGdodByIdP = (req, res) => {
  Gdod.Gdod.findById(req.body.id)
    .then((job) => res.json(job))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.gdodsByHativaId = (req, res) => {
  Gdod.find({ hativa: req.body.hativa })
    .sort({ index: 1 })
    .then((orders) => res.json(orders))
    .catch((err) => res.status(400).json("Error: " + err));
  // console.log(req.body);
};

exports.createGdod = (req, res) => {
  // console.log(req.body);
  const name = req.body.name;
  const hativa = req.body.hativa;
  // const index = req.body.index;

  const gdod = new Gdod({ name, hativa });
  ogda.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};
exports.updateGdod = (req, res) => {
  // const index = req.body.index;
  // console.log(req.body);
  Gdod.findById(req.params.id)
    .then((request) => {
      request.name = req.body.name;
      request.hativa = req.body.hativa;
      // request.index = req.body.index;
      request
        .save()
        .then(() => res.json(`Gdod updated!`))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.updatehativa = (req, res) => {
  // const index = req.body.index;
  // console.log(req.body);
  Gdod.findById(req.params.id)
    .then((request) => {
      request.hativa = req.body.hativa;
      // request.index = req.body.index;
      request
        .save()
        .then(() => res.json(`gdods hativa was updated!`))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.removeGdod = (req, res) => {
  Gdod.findByIdAndDelete(req.params.id)
    .then((gdod) => res.json(gdod))
    .catch((err) => res.status(400).json("Error: " + err)); 
};

// exports.updatekshirot = (req, res) => {
//   Gdod.updateOne({ _id: req.body[0] }, { kshirot: req.body[1] })
//     .then((orders) => res.json(orders))
//     .catch((err) => res.status(400).json("Error: " + err));
//   // console.log(req.body);
// };

// exports.updatehistory = (req, res) => {
//   Gdod.updateOne({ _id: req.body[0] }, { $push: { history: req.body[1] } })
//     .then((orders) => res.json(orders))
//     .catch((err) => res.status(400).json("Error: " + err));
//   // console.log(req.body);
// };

// exports.updatetraining = (req, res) => {
//   Gdod.updateOne({ _id: req.body[0] }, { training: req.body[1] })
//     .then((orders) => res.json(orders))
//     .catch((err) => res.status(400).json("Error: " + err));
//   // console.log(req.body);
// };

// exports.updatetraininghistory = (req, res) => {
//   Gdod.updateOne(
//     { _id: req.body[0] },
//     { $push: { traininghistory: req.body[1] } }
//   )
//     .then((orders) => res.json(orders))
//     .catch((err) => res.status(400).json("Error: " + err));
//   // console.log(req.body);
// };

// exports.updateallhistoryarray = (req, res) => {
//   Gdod.updateOne({ _id: req.body[0] }, { history: req.body[1] })
//     .then((orders) => res.json(orders))
//     .catch((err) => res.status(400).json("Error: " + err));
//   // console.log(req.body);
// };

// exports.updatealltraininghistoryarray = (req, res) => {
//   Gdod.updateOne({ _id: req.body[0] }, { traininghistory: req.body[1] })
//     .then((orders) => res.json(orders))
//     .catch((err) => res.status(400).json("Error: " + err));
//   // console.log(req.body);
// };
