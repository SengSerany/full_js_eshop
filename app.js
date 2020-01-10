const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('./models/Items');

const app = express();

const mongoDB = 'mongodb+srv://SengSerany:Diswallah3@cluster0-ozjti.gcp.mongodb.net/local_library?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useFindAndModify: false });
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('# we\'re connected to the database! #')
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', require('./controllers/items'));
app.use('/items', require('./controllers/items'));

app.listen(3000);