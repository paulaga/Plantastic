//const mongoose = require('mongoose');
const User = require('../models/User');
const Plant = require('../models/Plant')

function lookForNotifications(){
  User.find()    
  .then(users => 
    users.forEach(user => {
      Plant.findById(user._id)
      console.log(user._id)
    }))
  .catch(e => next(e))
}

module.exports = lookForNotifications;