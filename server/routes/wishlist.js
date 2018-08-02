const express = require('express');
const router = express.Router();
const Wish = require('../models/Wish');

//Create New
router.post('/', (req, res, next) => {
  const { text, author } = req.body;
  const newWish = { text, author };
  Wish.create(newWish)
    .then(object => res.json(object))
    .catch(e => next(e));
});

//Read all
router.get('/:author', (req, res, next) => {
  Wish.find({ author: req.params.author })
    .then(object => res.status(200).json(object))
    .catch(e => next(e))
});

//Delete
router.delete('/:id', (req,res,next) => {
  //const wish = req.params.id;
  Wish.findByIdAndDelete({id: req.params._id})
    .then(object => res.status(200).json(object))
    .catch(e => next(e));
});

module.exports = router;