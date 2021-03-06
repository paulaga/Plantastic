require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
const CronJob = require('cron').CronJob;
const lookForNotifications = require('./config/notificationsSearch');

const { DBURL } = process.env;
mongoose.Promise = Promise;
mongoose
  .connect(DBURL, {
    useMongoClient: true
  })
  .then(() => {
    console.log(`Connected to Mongo`)
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
var whitelist = [
  'http://localhost:4200',
];
var corsOptions = {
  origin: function(origin, callback){
      var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
      callback(null, originIsWhitelisted);
  },
  credentials: true
};
app.use(cors(corsOptions));

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

// Express View engine setup
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));

app.use(session({
  secret: 'angular auth passport secret shh',
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    maxAge: 2419200000
  },
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
require('./passport')(app);

//Cron counter
new CronJob('* * * * *', function() {
  lookForNotifications();
}, null, true, 'Europe/Madrid');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'assets', 'images', 'favicon.ico')));

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';


const authRouter = require('./routes/auth');
app.use('/api/auth', authRouter);
const notifRouter = require('./routes/notif');
app.use('/api/notif', notifRouter);
const plantsRouter = require('./routes/plants');
app.use('/api/plants', plantsRouter);
const tipsRouter = require('./routes/tips');
app.use('/api/tips', tipsRouter);
const wishRouter = require('./routes/wishlist');
app.use('/api/wishlist', wishRouter);
const playRouter = require('./routes/playlist');
app.use('/api/play', playRouter);
app.use((req,res) => res.sendFile(__dirname+'/public/index.html'));
module.exports = app;