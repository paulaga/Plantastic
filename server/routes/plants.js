const express = require('express');
const router = express.Router();
const Plant = require('../models/Plant')

//Create New
router.post('/', (req, res, next) => {
  const { image, name, birth, rip, ligth, room, water, fertilize, transplant } = req.body;
  const newPlant = { image, name, birth, rip, ligth, room, water, fertilize, transplant };
  Plant.create(newPlant)
    .then(object => res.json(object))
    .catch(e => next(e));
});

//Read all
router.get('/', (req, res, next) => {
  Plant.find()
    .then(object => res.status(200).json(object))
    .catch(e => next(e))
});

//Read one
router.get('/:id', (req, res, next) => {
  Plant.findOne()
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