const express = require('express');
const router = express.Router();
const Plant = require('../models/Plant');

//Create New
router.post('/', (req, res, next) => {
  const { image, name, birth, rip, light, room, lastWater, nextWater, fertilize, transplant, author } = req.body;
  const newPlant = { image, name, birth, rip, light, room, lastWater, nextWater, fertilize, transplant, author };
  Plant.create(newPlant)
    .then(object => res.json(object))
    .catch(e => next(e));
});

//Read all
router.get('/list/:author', (req, res, next) => {
  Plant.find({ author: req.params.author })
    .then(object => res.status(200).json(object))
    .catch(e => next(e))
});

//Read one
router.get('/:id', (req, res, next) => {
  Plant.findById(req.params.id)
    .then(object => res.status(200).json(object))
    .catch(e => next(e))
});

//Update
router.put('/:id', (req,res,next) => {
  const plantId = req.params.id;
  const update = req.body;
  Plant.findByIdAndUpdate(plantId, update, { new: true })
    .then(object => res.status(200).json(object))
    .catch(e => next(e));
});

//Delete
router.delete('/:id', (req,res,next) => {
  const plantId = req.params.id;
  Plant.findByIdAndDelete(plantId)
    .then(object => res.status(200).json(object))
    .catch(e => next(e));
});

module.exports = router;