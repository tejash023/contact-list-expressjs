//require the library
const mongoose = require('mongoose');

//connect to database
mongoose.connect('mongodb://localhost/contacts_list_db');

//acuire the connection to check if is connected successfully

const db = mongoose.connection;

//connection error
db.on('error', console.error.bind(console, 'error connecting to db'));

//connection successfull
db.once('open', function(){
  console.log('Successfully connected to the database');
});