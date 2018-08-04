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
          console.log(user.username)
          //console.log(plant.author)
          //console.log(plant.lastWater)
          //console.log(moment(plant.lastWater).add(plant.waterTimes, 'days').format('LL'))
          plant.nextWater = moment(plant.lastWater).add(plant.waterTimes, 'days').format('LL');
          //console.log(plant.nextWater = moment(plant.lastWater).add(plant.waterTimes, 'days').format('LL'))
          //console.log(moment().format('LL'))
          if((plant.nextWater = moment(plant.lastWater).add(plant.waterTimes, 'days').format('LL')) == moment().format('LL')) {
 
            if(plant.author.toString() == user._id.toString()){
              console.log("yes")
              console.log(`Hoy tienes que regar a ${plant.name}`)
            }
          //} else {
          //  console.log("no")
          }
        })
      })
    }))
  .catch(e => next(e))
}

//sendNotif(){
//  console.log(`Hoy tienes que regar a ${plant.name}`)
//}

module.exports = lookForNotifications;