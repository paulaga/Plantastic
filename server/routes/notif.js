const express = require("express");
const router = express.Router();
const Notif = require("../models/Notification");

//Create New
// router.post('/', uploadCloud.single('file'), (req, res, next) => {
//   const { image, name, birth, light, room, waterTimes, lastWater, nextWater, fertilize, transplant, author } = req.body;
//   const newPlant = { image, name, birth, light, room, waterTimes, lastWater, nextWater, fertilize, transplant, author };
//   if(req.file.url) {
//     newPlant.image = req.file.url
//   }
//   Plant.create(newPlant)
//     .then(object => res.status(200).json(object))
//     .catch(e => next(e));
// });

//Read all
router.post("/", (req, res, next) => {
  console.log(req.body.user+ '<-------')
  if (req.body) {
    Notif.find({ author: req.body.user })
      .then(object => res.status(200).json(object))
      .catch(e => next(e));
  }
});

//Read one
// router.get('/:id', (req, res, next) => {
//   Plant.findById(req.params.id)
//     .then(object => res.status(200).json(object))
//     .catch(e => next(e))
// });

// //Update
// router.put('/:id', (req,res,next) => {
//   const plantId = req.params.id;
//   const update = req.body;
//   Plant.findByIdAndUpdate(plantId, update, { new: true })
//     .then(object => res.status(200).json(object))
//     .catch(e => next(e));
// });

// //Delete
// router.delete('/:id', (req,res,next) => {
//   const plantId = req.params.id;
//   Plant.findByIdAndRemove(plantId)
//     .then(object => res.status(200).json(object))
//     .catch(e => next(e));
// });

module.exports = router;
