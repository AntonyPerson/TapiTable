const { mongo } = require("mongoose");
const Mahlaka = require("../../models/units/mahlaka.model");

exports.findMahlakaByIdG = (req, res) => {
  console.log(req.params.id);
  Mahlaka.findById(req.params.id)
    .then((request) => {
      console.log(request);
      res.json(request);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.findAll = (req, res) => {
  Mahlaka.find()
    .sort({ index: 1 })
    .then((mahlaka) => res.json(mahlaka))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.findMahlakaById = (req, res) => {
  Mahlaka.findById(req.body.id)
    .then((job) => res.json(job))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.mahlakaByPlogaId = (req, res) => {
  Mahlaka.find({ ploga: req.body.ploga })
    .sort({ index: 1 })
    .then((orders) => res.json(orders))
    .catch((err) => res.status(400).json("Error: " + err));
  // console.log(req.body);
};

exports.mahlakaByHativaId = (req, res) => {
  Mahlaka.find({ hativa: req.body.hativa })
    .sort({ index: 1 })
    .then((orders) => res.json(orders))
    .catch((err) => res.status(400).json("Error: " + err));
  // console.log(req.body);
};

exports.createMahlaka = (req, res) => {
  // console.log(req.body);
  const name = req.body.name;
  const ploga = req.body.ploga;
  const hativa = req.body.hativa;
  const countSoliders = req.body.countSoliders;
  const countWatches = req.body.countWatches;
  const countWatchesUsed = req.body.countWatchesUsed;
  // const index = req.body.index;

  const mahlaka = new Mahlaka({
    name,
    ploga,
    hativa,
    countSoliders,
    countWatches,
    countWatchesUsed,
  });
  mahlaka.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};
exports.updateMahlaka = (req, res) => {
  // const index = req.body.index;
  // console.log(req.body);
  Mahlaka.findById(req.params.mahlakaId)
    .then((request) => {
      request.name = req.body.name;
      request.ploga = req.body.ploga;
      request.hativa = req.body.hativa;
      request.countSoliders = req.body.countSoliders;
      request.countWatches = req.body.countWatches;
      request.countWatchesUsed = req.body.countWatchesUsed;
      // request.index = req.body.index;
      request
        .save()
        .then(() => res.json(`Mahlaka updated!`))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.updatePloga = (req, res) => {
  // const index = req.body.index;
  // console.log(req.body);
  Mahlaka.findById(req.params.mahlakaId)
    .then((request) => {
      request.ploga = req.body.ploga;
      // request.index = req.body.index;
      request
        .save()
        .then(() => res.json(`Mahlaka ploga was updated!`))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.updateHativa = (req, res) => {
  // const index = req.body.index;
  // console.log(req.body);
  Mahlaka.findById(req.params.mahlakaId)
    .then((request) => {
      request.hativa = req.body.hativa;
      // request.index = req.body.index;
      request
        .save()
        .then(() => res.json(`Mahlaka hativa was updated!`))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.updateCountSoliders = (req, res) => {
    // const index = req.body.index;
  // console.log(req.body);
  Mahlaka.findById(req.params.mahlakaId)
    .then((request) => {
      request.countSoliders = req.body.countSoliders;
      // request.index = req.body.index;
      request
        .save()
        .then(() => res.json(`Mahlaka countSoliders was updated!`))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.updateCountWatches = (req, res) => {
  // const index = req.body.index;
  // console.log(req.body);
  Mahlaka.findById(req.params.mahlakaId)
    .then((request) => {
      request.countWatches = req.body.countWatches;
      // request.index = req.body.index;
      request
        .save()
        .then(() => res.json(`Mahlaka countWatches was updated!`))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.updateCountWatchesUsed = (req, res) => {
  // const index = req.body.index;
  // console.log(req.body);
  Mahlaka.findById(req.params.mahlakaId)
    .then((request) => {
      request.countWatchesUsed = req.body.countWatchesUsed;
      // request.index = req.body.index;
      request
        .save()
        .then(() => res.json(`Mahlaka countWatchesUsed was updated!`))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.removeMahlaka = (req, res) => {
  Mahlaka.findByIdAndDelete(req.params.id)
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
