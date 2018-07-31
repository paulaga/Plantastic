require('dotenv').config();

const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const salt = bcrypt.genSaltSync(10);
const hashPass = bcrypt.hashSync('1111', salt);

const users = [
  {
    username: 'pau',
    email: 'pau@sdlsf.com',
    password: hashPass
  },
  {
    username: 'luisa',
    email: 'sd@sdlsf.com',
    password: hashPass
  },
  {
    username: 'juan',
    email: 'ghtr@sdlsf.com',
    password: hashPass
  },
];

//User.collection.drop();

User.create(users, (err, data) => {
  if (err) {throw (err)}
  console.log("User created")
  //mongoose.disconnect();
})