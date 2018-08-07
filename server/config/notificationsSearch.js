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
            //console.log("----------")
            //console.log(user.username)
            //console.log(plant.author)
            //console.log(plant.lastWater)
            //console.log(moment(plant.lastWater).add(plant.waterTimes, 'days').format('LL'))
            plant.nextWater = moment(plant.lastWater)
              .add(plant.waterTimes, "days")
              .format("LL");
            //console.log(plant.nextWater = moment(plant.lastWater).add(plant.waterTimes, 'days').format('LL'))
            //console.log(moment().format('LL'))
            if (
              (plant.nextWater = moment(plant.lastWater)
                .add(plant.waterTimes, "days")
                .format("LL")) == moment().format("LL")
            ) {
              console.log(`Hoy tienes que regar a ${plant.name}`)
              //guardar mensaje en modelo Notification
              Notif.find({ author: user._id }).then(notifs => {
                if(notifs.length == 0) {
                  Notif.create({
                    message: `Hoy tienes que regar a ${plant.name}`,
                    nextWater: plant.nextWater,
                    author: user._id
                  });
                }else {
                  notifs.forEach(notif => {
                    console.log(notif)
                    console.log(notif.message)
                    if (
                      notif.message != `Hoy tienes que regar a ${plant.name}`
                    ) {
                      console.log(`Entraaaaaaa`)
                      /* let newNot = new Notif({
                        message: `Hoy tienes que regar a ${plant.name}`,
                        nextWater: plant.nextWater,
                        author: user._id
                      }); */
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
            // if(plant.author.toString() == user._id.toString()){
            //   console.log("----------")
            //   console.log(user)
            //   console.log(plant)
            //   //console.log("yes")
            //   console.log(`Hoy tienes que regar a ${plant.name}`)
            // }
            //} else {
            //  console.log("no")
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
