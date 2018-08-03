//const mongoose = require('mongoose');
const User = require('../models/User');
const Plant = require('../models/Plant')

function lookForNotifications(){
  User.find()    
  .then(users => 
    users.forEach(user => {
      Plant.find()
      .then(plants => {
        plants.forEach(plant => {
          console.log(plant.author)
          console.log(user._id)
          //if{plant}
          
          
          if(plant.author.toString() == user._id.toString()){
            console.log("yes")
          } else {
            console.log("no")
          }
        })
      })
      //if (Plant)
      //Plant.findById(user._id)
      //console.log(Plant.findById(user._id))
    }))
  .catch(e => next(e))
}

module.exports = lookForNotifications;