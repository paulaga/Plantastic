//const mongoose = require('mongoose');
const User = require("../models/User");
const Plant = require("../models/Plant");
const Notif = require("../models/Notification");
const moment = require("moment");

function lookForNotifications() {
  User.find()
    .then(users =>
    users.forEach(user => {
      Plant.find({ author: user._id }).then(plants => {
      plants.forEach(plant => {
        plant.nextWater = moment(plant.lastWater)
        .add(plant.waterTimes, "days").format("LL");
        if(
          (plant.nextWater = moment(plant.lastWater)
          .add(plant.waterTimes, "days")
          .format("LL")) == moment().format("LL")
        ){
          Notif.find({ author: user._id }).then(notifs => {
            if(notifs.length == 0) 
            {
              Notif.create({
                message: `Hoy tienes que regar a ${plant.name}`,
                nextWater: plant.nextWater,
                author: user._id
              });
            } else {
              notifs.forEach(notif => {
                if(notif.message != `Hoy tienes que regar a ${plant.name}`) 
                {
                  Notif.create({
                    message: `Hoy tienes que regar a ${plant.name}`,
                    nextWater: plant.nextWater,
                    author: user._id
                  });
                }
              });
            }
          });
        }
      });
      });
    })
    )
    .catch(e => next(e));
}

//sendNotif(){
//  console.log(`Hoy tienes que regar a ${plant.name}`)
//}

module.exports = lookForNotifications;
