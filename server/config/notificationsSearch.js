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
          (plant.nextWater = moment(plant.nextWater).format("LL")) == moment().format("LL")
        ){
          Notif.find({ plantId: plant._id }).then(notifs => {
            if(notifs.length == 0) 
            {
              Notif.create({
                message: `Hoy tienes que regar a ${plant.name}`,
                nextWater: plant.nextWater,
                plantId: plant._id,
                author: user._id
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


module.exports = lookForNotifications;
