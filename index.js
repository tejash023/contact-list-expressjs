const express = require('express');
const path = require('path');

const port = 8000;
const app = express();


app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());

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

app.listen(port, function(err){

  if(err) {console.log('Errors');}

  console.log("Express server is up and running at port" + port);
})
