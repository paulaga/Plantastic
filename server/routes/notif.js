const express = require("express");
const router = express.Router();
const Notif = require("../models/Notification");
const moment = require("moment");

//Read all
router.post("/", (req, res, next) => {
  if (req.body) {
    Notif.find({ author: req.body.user })
      .then(object => res.status(200).json(object))
      .catch(e => next(e));
  }
});

//Update lastWater
// router.put("/:id", (req, res, next) => {
//   notif.lastWater = moment();
//   const last = notif.lastWater;
//   const notifId = req.params.id;

//   Notif.findByIdAndUpdate(notifId, last, {new: true})
//     .then(object => res.status(200).json(object))
//     .catch(e => next(e));
// });

//Delete
router.delete("/:plantId", (req, res, next) => {
  console.log(req.params.plantId)
  Notif.deleteMany({plantId: req.params.plantId})
    .then(object => res.status(200).json(object))
    .catch(e => next(e));
});

module.exports = router;
