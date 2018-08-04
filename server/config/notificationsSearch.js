//const mongoose = require('mongoose');
const User = require('../models/User');
const Plant = require('../models/Plant')
const moment = require ('moment');

function lookForNotifications(){
  User.find()    
  .then(users => 
    users.forEach(user => {
      Plant.find()
      .then(plants => {
        plants.forEach(plant => {
          console.log("----------")
          console.log(plant.author)
          console.log(plant.lastWater)
          console.log(moment(plant.lastWater).add(plant.waterTimes, 'days').format('LL'))
          plant.nextWater = moment(plant.lastWater).add(plant.waterTimes, 'days').format('LL');
          console.log(plant.nextWater = moment(plant.lastWater).add(plant.waterTimes, 'days').format('LL'))
          console.log(moment().format('LL'))
          if((plant.nextWater = moment(plant.lastWater).add(plant.waterTimes, 'days').format('LL')) == moment().format('LL')) {
            console.log(`Hoy tienes que regar a ${plant.name}`)
          }
          
          
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