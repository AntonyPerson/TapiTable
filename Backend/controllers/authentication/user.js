const User = require("../../models/authentication/user.model");
const mongoose = require("mongoose");

exports.getuserbyid = (req, res) => {
  User.findById(req.body.userid).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "משתמש לא נמצא",
      });
    } else {
      res.send(user);
    }
  });
};

exports.getusersandsortbylevel = (req, res) => {
  User.find()
    .sort({ admin: -1, adminType: -1 })
    .then((orders) => res.json(orders))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.getuserbypersonalnumber = (req, res) => {
  User.findOne(req.body.personalnumber).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "משתמש לא נמצא",
      });
    } else {
      res.send(user);
    }
  });
};

exports.find = (req, res) => {
  User.find()
    .sort({ updatedAt: "descending" })
    .then((orders) => res.json(orders))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.update = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!user) {
    res.status(404).send({ message: "שגיאה בעדכון" });
  }
  res.status(200).send(user);
};

exports.remove = (req, res) => {
  console.log(req.body); //prints {}
  console.log(req.params); //prints { userId: '608e42b1cedc2a3a18492ae5' }
  User.deleteOne({ _id: req.params.userId })
    .then((orders) => res.json(orders))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.usersbyrole = (req, res) => {
  User.find({ admin: req.params.admin })
    .then((orders) => res.json(orders))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.getinspectors = (req, res) => {
  User.find({
    $or: [
      { $and: [{ admin: "1" }, { adminType: "1" }] },
      { $and: [{ admin: "2" }, { adminType: "2" }] },
    ],
  })
    .sort({ admin: -1, adminType: -1 })
    .exec()
    .then((u) => {
      const users = u.map((user) => {
        return {
          id: user._id,
          personalnumber: user.personalnumber,
          info: `${user.firstName} ${user.lastLame} - ${user.personalnumber}`,
        };
      });
      console.log(u);
      return res.json(users);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};
