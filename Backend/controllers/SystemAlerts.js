/* eslint-disable prefer-template */
/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
const router = require("express").Router();
const SystemAlerts = require("../models/SystemAlerts.model");

exports.findAll = (req, res) => {
  SystemAlerts.find()
    .sort({ updatedAt: -1 })
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.findAllByType = (req, res) => {
  const type = req.params.type;

  SystemAlerts.find({ type: type })
    .sort({ updatedAt: -1 })
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.add = (req, res) => {
  const title = req.body.title;
  const body = req.body.body;
  // const date = req.body.date;
  const type = req.body.type;
  // const experationPeriod = req.body.experationPeriod;
  const personalnumber = req.body.personalnumber;

  const newGeneralAlerts = new SystemAlerts({
    title,
    body,
    // date,
    type,
    // experationPeriod,
    personalnumber,
  });

  const alertId = newGeneralAlerts.save((err, alert) => {
    if (err) {
      return res.status(400).json("Error: " + err);
    } else {
      res.send(alert.id);
    }
  });
};

exports.alertsByPersonalnumber = (req, res) => {
  // console.log(req.body);
  // console.log(req.params);
  const personalnumber = req.params.personalnumber;
  // const personalnumber = "7654321";
  SystemAlerts.find({ personalnumber: personalnumber })
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.findAlertByID = (req, res) => {
  SystemAlerts.findById(req.params.id)
    .sort({ updatedAt: -1 })
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.deleteAlertByID = (req, res) => {
  SystemAlerts.findByIdAndDelete(req.params.id)
    .then(() => res.json("SystemAlerts deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.updateAlertByID = (req, res) => {
  SystemAlerts.findById(req.params.id)
    .then((request) => {
      request.title = req.body.title;
      request.body = req.body.body;
      // request.date = Date.parse(req.body.date);
      request.type = req.body.type;
      // request.experationPeriod = Number(req.body.experationPeriod);
      request.personalnumber = req.body.personalnumber;

      request
        .save()
        .then(() => res.json("SystemAlerts updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};
