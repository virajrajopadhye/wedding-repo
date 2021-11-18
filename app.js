const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
var bodyParser = require('body-parser')
const AWS = require('aws-sdk'); 
const mysql = require('mysql');
const { count } = require('console');


const con = mysql.createConnection({
  host: "rsvp.csg1xdllrsjy.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: process.env.PASSWORD
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  console.log
});



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

  var sql= 'INSERT INTO invitation.attendees (atName, email) VALUES (?,?)';

    con.query(sql, [name, email], function(error, result, fields) {
      
      //if (err) console.log(err)
      if (result) console.log("success");
      res.sendFile(path.join(__dirname+'/thankyou.html'));
      if (fields) console.log(fields);
    });

});


app.get('/attendees', (req, res) => {
  con.connect(function(err) {
    var sql= 'SELECT * FROM invitation.attendees';
      con.query(sql, function(err, result, fields) {
       
          if (err) res.send(err);
          if (result){

            console.log(result);
            res.render('results.pug',{data : result, count: result.length});

          }
      });
  });
});


app.post('/message', (req,res)=> {
  const fname = req.body.fname
  const lname = req.body.lname
  const email = req.body.email
  const subject = req.body.subject
  const message = req.body.message
  console.log(fname);
  console.log(email);

  var sql= 'INSERT INTO invitation.wishes (fname, lname, email, subject, message) VALUES (?,?,?,?,?)';

    con.query(sql, [fname, lname, email, subject, message], function(error, result, fields) {
      
      //if (err) console.log(err)
      if (result) console.log("success");
      res.sendFile(path.join(__dirname+'/thankyou.html'));
      if (fields) console.log(fields);
    });

});

app.get('/viewMessages', (req, res) => {
  con.connect(function(err) {
    var sql= 'SELECT * FROM invitation.wishes';
      con.query(sql, function(err, result, fields) {
       
          if (err) res.send(err);
          if (result){

            console.log(result);
            res.render('messages.pug',{data : result, count: result.length});

          }
      });
  });
});






//add the router
app.use('/', router);
app.listen(process.env.port || 80);

console.log('Running at Port 80');
