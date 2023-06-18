const Ploga = require("../../models/units/ploga.model");

exports.findPlogaByIdG = (req, res) => {
  console.log(req.params.id);
  Ploga.findById(req.params.id)
    .then((request) => {
      console.log(request);
      res.json(request);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.findAll = (req, res) => {
  Ploga.find()
    .sort({ index: 1 })
    .then((ploga) => res.json(ploga))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.findPlogaByIdP = (req, res) => {
  Ploga.find(req.body.id)
    .then((job) => res.json(job))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.plogaByGdodId = (req, res) => {
  Ploga.find({ gdod: req.body.gdod })
    .sort({ index: 1 })
    .then((orders) => res.json(orders))
    .catch((err) => res.status(400).json("Error: " + err));
  // console.log(req.body);
};

exports.plogaByHativaId = (req, res) => {
  Ploga.find({ hativa: req.body.hativa })
    .sort({ index: 1 })
    .then((orders) => res.json(orders))
    .catch((err) => res.status(400).json("Error: " + err));
  // console.log(req.body);
};

exports.createPloga = (req, res) => {
  // console.log(req.body);
  const name = req.body.name;
  const gdod = req.body.gdod;
  const hativa = req.body.hativa;
  // const index = req.body.index;

  const ploga = new Ploga({ name, gdod, hativa });
  ploga.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};

exports.updatePloga = (req, res) => {
  // const index = req.body.index;
  // console.log(req.body);
  Ploga.findById(req.params.id)
    .then((request) => {
      request.name = req.body.name;
      request.hativa = req.body.hativa;
      request.gdod = req.body.gdod;
      // request.index = req.body.index;
      request
        .save()
        .then(() => res.json(`Ploga updated!`))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.updateHativa = (req, res) => {
  Ploga.updateOne({ _id: req.body[0] }, { hativa: req.body[1] })
    .then((orders) => res.json(orders))
    .catch((err) => res.status(400).json("Error: " + err));
  // console.log(req.body);
};

exports.updateGdod = (req, res) => {
  Ploga.updateOne({ _id: req.body[0] }, { gdod: req.body[1] })
    .then((orders) => res.json(orders))
    .catch((err) => res.status(400).json("Error: " + err));
  // console.log(req.body);
};

exports.removeGdod = (req, res) => {
  Gdod.findByIdAndDelete(req.params.id)
    .then((ogdot) => res.json(ogdot))
    .catch((err) => res.status(400).json("Error: " + err));
};

// exports.updatekshirot = (req, res) => {
//   Gdod.updateOne({_id: req.body[0]},{kshirot:req.body[1]})
//   .then(orders => res.json(orders))
//   .catch(err => res.status(400).json('Error: ' + err));;
//  // console.log(req.body);
// }

// exports.updatehistory = (req, res) => {
//   Gdod.updateOne({_id: req.body[0]}, { $push: { history: req.body[1] } })
//   .then(orders => res.json(orders))
//   .catch(err => res.status(400).json('Error: ' + err));;
//  // console.log(req.body);
// }

// exports.updatetraining = (req, res) => {
//   Gdod.updateOne({_id: req.body[0]},{training:req.body[1]})
//   .then(orders => res.json(orders))
//   .catch(err => res.status(400).json('Error: ' + err));;
//  // console.log(req.body);
// }

// exports.updatetraininghistory = (req, res) => {
//   Gdod.updateOne({_id: req.body[0]}, { $push: { traininghistory: req.body[1] } })
//   .then(orders => res.json(orders))
//   .catch(err => res.status(400).json('Error: ' + err));;
//  // console.log(req.body);
// }

// exports.updateallhistoryarray = (req, res) => {
//   Gdod.updateOne({ _id: req.body[0] }, { history: req.body[1] })
//     .then(orders => res.json(orders))
//     .catch(err => res.status(400).json('Error: ' + err));;
//   // console.log(req.body);
// }

// exports.updatealltraininghistoryarray = (req, res) => {
//   Gdod.updateOne({ _id: req.body[0] }, { traininghistory: req.body[1] })
//     .then(orders => res.json(orders))
//     .catch(err => res.status(400).json('Error: ' + err));;
//   // console.log(req.body);
// }
