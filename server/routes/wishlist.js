const express = require('express');
const router = express.Router();
const Wish = require('../models/Wish');
const { ensureLoggedIn } = require('../middleware/ensurelogin');

//Create New
router.post('/', (req, res, next) => {
  const { text, author } = req.body;
  const newWish = { text, author };
  Wish.create(newWish)
    .then(object => res.json(object))
    .catch(e => next(e));
});

//Read all
router.get('/:author', ensureLoggedIn(), (req, res, next) => {
  Wish.find({ author: req.params.author })
    .then(object => res.status(200).json(object))
    .catch(e => next(e))
});

//Delete
router.delete('/:id', ensureLoggedIn(), (req,res,next) => {
  const wish = req.params.id;
  Wish.findByIdAndRemove(wish)
    .then(() => res.status(200).json({message: `Eliminado ${req.params.id}`}))
    .catch(e => next(e));
});

module.exports = router;