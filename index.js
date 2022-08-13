const express = require('express');
const path = require('path');

const port = 8000;

//connect mongoose
const db = require('./config/mongoose');
//require model
const Contact = require('./models/contact');


const app = express();


app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));

//middleware
app.use(express.urlencoded());

app.use(express.static('assets'));

// var contactList = [
//   {
//     name: 'Tejash',
//     phone: '9374567456'
//   },
//   {
//     name: 'Raj',
//     phone: '9345567456'
//   },
//   {
//     name: 'Vardhan',
//     phone: '9344536745'
//   }

// ]

app.get('/', function(req,res){

  //fetch contact from DB
  Contact.find({}, function(err,contact){
    if(err) {
      console.log('Error fetching data from DB'); 
      return;
    }
    return res.render('index',{
      title:'My Contact List',
      contact_list : contact
    });

  })
  
  
})

app.post('/create-contact', function(req, res){

  // contactList.push({
  //   name:req.body.name,
  //   phone: req.body.phone
  // })

  Contact.create({
    name: req.body.name,
    phone: req.body.phone
  }, function(err, newContact){
    if(err){console.log('error in creating a contact'); return}
    
    return res.redirect('back');
  })

  //contactList.push(req.body);

  
})

// app.get('/practice', (req, res) =>{

//   return res.render('practice', {
//     title: 'Playground'
//   })
// })

//delete a contact
app.get('/delete-contact', (req, res) => {
  //getting an id
  let id = req.query.id;

  Contact.findByIdAndDelete(id, function(err){
    if(err){
      console.log('Error deleting contact from DB');
      return;
    }

    return res.redirect('back');
  })
  

})


//starting server
app.listen(port, function(err){

  if(err) {console.log('Errors');}

  console.log("Express server is up and running at port" + port);
})
