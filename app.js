const express = require('express');
const mongoose = require('mongoose');
require('./models/Items');

const app = express();

mongoose.connect('mongodb://127.0.0.1/eshop', {useNewUrlParser: true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('# we\'re connected to the database! #')
});

app.set('view engine', 'ejs');
app.use('/', require('./controllers/items'));
app.use('/items', require('./controllers/items'));

app.listen(3000);