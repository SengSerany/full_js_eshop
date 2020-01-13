const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session')

require('./models/Items');
require('./models/Users');

const app = express();

require('dotenv').config()

const mongoDB = process.env.mongoDbServer;
mongoose.connect(mongoDB, {useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true });
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('# we\'re connected to the database! #')
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: process.env.sessionKey,
  resave: true,
  saveUninitialized: true
}));
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
})
app.use('/', require('./controllers/items'));
app.use('/items', require('./controllers/items'));
app.use('/users', require('./controllers/users'));

app.listen(3000);