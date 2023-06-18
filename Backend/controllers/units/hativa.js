const Hativa = require("../../models/units/hativa.model");

exports.findHativaByIdG = async (req, res) => {
  console.log(req.params.id);
  Hativa.findById(req.params.id)
    .then((request) => {
      console.log(request);
      res.json(request);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};
exports.findAll = (req, res) => {
  Hativa.find()
    .sort({ index: 1 })
    .then((hativa) => res.json(hativa))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.findHativaByIdP = (req, res) => {
  Hativa.Hativa.findById(req.body.id)
    .then((job) => res.json(job))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.hativasByOgdaId = (req, res) => {
  Hativa.find({ ogda: req.body.ogda })
    .sort({ index: 1 })
    .then((orders) => res.json(orders))
    .catch((err) => res.status(400).json("Error: " + err));
  // console.log(req.body);
};

exports.createHativa = (req, res) => {
  const name = req.body.name;
  const ogda = req.body.ogda;
  // const index = req.body.index

  const hativa = new Hativa({ name, ogda });
  hativa.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};
exports.updateHativa = (req, res) => {
  // const index = req.body.index;
  // console.log(req.body);
  Hativa.findById(req.params.id)
    .then((request) => {
      request.name = req.body.name;
      request.ogda = req.body.ogda;
      // request.index = req.body.index;
      request
        .save()
        .then(() => res.json(`Hativa updated!`))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.updateOgda = (req, res) => {
  // const index = req.body.index;
  // console.log(req.body);
  Hativa.findById(req.params.id)
    .then((request) => {
      request.ogda = req.body.ogda;
      // request.index = req.body.index;
      request
        .save()
        .then(() => res.json(`Hativa ogda was updated!`))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.removeHativa = (req, res) => {
  Hativa.findByIdAndRemove(req.params.id)
    .then((hativa) => res.json(hativa))
    .catch((err) => res.status(400).json("Error: " + err));
};

// exports.updategdods = (req, res) => {
//   Hativa.updateOne({ _id: req.body[0] }, { gdod: req.body[1] })
//     .then((orders) => res.json(orders))
//     .catch((err) => res.status(400).json("Error: " + err));
//   // console.log(req.body);
// };
// exports.updatematag = (req, res) => {
//   Hativa.updateOne({ _id: req.body[0] }, { matag: req.body[1] })
//     .then((orders) => res.json(orders))
//     .catch((err) => res.status(400).json("Error: " + err));
//   console.log(req.body);
// };

// exports.updatemataghistory = (req, res) => {
//   Hativa.updateOne(
//     { _id: req.body[0] },
//     { $push: { mataghistory: req.body[1] } }
//   )
//     .then((orders) => res.json(orders))
//     .catch((err) => res.status(400).json("Error: " + err));
//   console.log(req.body);
// };

// exports.updateallmataghistoryarray = (req, res) => {
//   Hativa.updateOne({ _id: req.body[0] }, { mataghistory: req.body[1] })
//     .then((orders) => res.json(orders))
//     .catch((err) => res.status(400).json("Error: " + err));
//   // console.log(req.body);
// };
