const express = require('express');
const router = express.Router();
const Tip = require('../models/Tip');

//Create New
router.post('/', (req, res, next) => {
  const { text, plantId } = req.body;
  const newTip = { text, plantId };
  Tip.create(newTip)
    .then(object => res.json(object))
    .catch(e => next(e));
});

//Read all
router.get('/:plant', (req, res, next) => {
  Tip.find({ plant: req.params.plant })
    .then(object => res.status(200).json(object))
    .catch(e => next(e))
});

module.exports = router;