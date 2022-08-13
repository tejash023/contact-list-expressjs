const express = require('express');
const path = require('path');

const port = 8000;
const app = express();


app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));

//middleware
app.use(express.urlencoded());

app.use(express.static('assets'));

var contactList = [
  {
    name: 'Tejash',
    phone: '9374567456'
  },
  {
    name: 'Raj',
    phone: '9345567456'
  },
  {
    name: 'Vardhan',
    phone: '9344536745'
  }

]

app.get('/', function(req,res){
  
  return res.render('index',{
      title:'My Contact List',
      contact_list : contactList
  });
})

app.post('/create-contact', function(req, res){

  // contactList.push({
  //   name:req.body.name,
  //   phone: req.body.phone
  // })

  contactList.push(req.body);

  return res.redirect('back');
})

// app.get('/practice', (req, res) =>{

//   return res.render('practice', {
//     title: 'Playground'
//   })
// })

//delete a contact
app.get('/delete-contact', (req, res) => {
  let phone = req.query.phone;

  let contactIndex = contactList.findIndex(contact => contact.phone == phone);
  

  if(contactIndex != -1){
    contactList.splice(contactIndex, 1);
  }

  return res.redirect('back');
})

app.listen(port, function(err){

  if(err) {console.log('Errors');}

  console.log("Express server is up and running at port" + port);
})
