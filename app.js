const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
var bodyParser = require('body-parser')

app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({
  extended: true
}))


app.use(
  "/css",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
)
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
)
app.use("/js", express.static(path.join(__dirname, "node_modules/jquery/dist")))

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});

router.get('/about',function(req,res){
  res.sendFile(path.join(__dirname+'/about.html'));
});

router.get('/contact',function(req,res){
  res.sendFile(path.join(__dirname+'/contact.html'));
});

app.post('/rsvp', (req,res)=> {
  const name = req.body.name
  const email = req.body.email
  console.log(name);
  console.log(email);
  res.sendFile(path.join(__dirname+'/thankyou.html'));
  // res.sendFile(path.join(__dirname+'/thanks.html'));
});


//add the router
app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');
