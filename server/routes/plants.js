const express = require('express');
const router = express.Router();
const Plant = require('../models/Plant');
const multer = require('multer')
const uploadCloud = require('../config/cloudinary')
const { ensureLoggedIn } = require('../middleware/ensurelogin');

//Create New
router.post('/', uploadCloud.single('file'), (req, res, next) => {
  const { image, name, birth, light, room, waterTimes, lastWater, nextWater, fertilize, transplant, author } = req.body;
  const newPlant = { image, name, birth, light, room, waterTimes, lastWater, nextWater, fertilize, transplant, author };
  if(req.file.url) { 
    newPlant.image = req.file.url
  }
  Plant.create(newPlant)
    .then(object => res.status(200).json(object))
    .catch(e => next(e));
});

//Read all
router.get('/list/:author', ensureLoggedIn(), (req, res, next) => {
  Plant.find({ author: req.params.author })
    .then(object => res.status(200).json(object))
    .catch(e => next(e))
});

//Read one
router.get('/:id', ensureLoggedIn(), (req, res, next) => {
  Plant.findById(req.params.id)
    .then(object => res.status(200).json(object))
    .catch(e => next(e))
});

//Update
router.put('/:id', ensureLoggedIn(), (req,res,next) => {
  const plantId = req.params.id;
  const {update} = req.body;
  console.log(update)
  Plant.findByIdAndUpdate(plantId, {lastWater: update}, { new: true })
    .then(object => res.status(200).json(object))
    .catch(e => next(e));
});

//Delete
router.delete('/:id', ensureLoggedIn(), (req,res,next) => {
  const plantId = req.params.id;
  Plant.findByIdAndRemove(plantId)
    .then(object => res.status(200).json(object))
    .catch(e => next(e));
});

module.exports = router;