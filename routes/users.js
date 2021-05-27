var express = require('express');
var router = express.Router();
var db = require('../database');

// to display form
router.get('/register', function(req, res, next) { 
  res.render('users'); 
});

// to store imput data in database
router.post('/register', function(req, res, next) {
  
  // store all the user input data
  inputData = {
    fname: req.body.fname,
    email : req.body.email,
    city  : req.body.city,
    address : req.body.address,
    password: req.body.password,
    confirm_password: req.body.confirm_password
  };

  var sql='SELECT * FROM lb_users WHERE email = ?';
  db.query(sql, [inputData.email_address] ,function (err, data, fields) {
   if(err) throw err
   if(data.length>1){
       var msg = inputData.email_address  + "already exists";
   }else if(inputData.confirm_password != inputData.password){
      var msg ="Password and Confirm Password do not match";
   }else{
    // insert user data into users table
    var fname = inputData.fname;
    var email = inputData.email;
    var city = inputData.city;
    var address = inputData.address;
    var password = inputData.password;

    var sql = `INSERT INTO lb_users (full_name,email,city,address, password)
    VALUES ('${fname}', '${email}', '${city}', '${address}','${password}')`;
    db.query(sql, function (err, data) { 
          if (err) throw err;
          console.log('User data was inserted succesfully!');
    });
    var msg ="Your are successfully registered";
  }

    res.render('users',{alertMsg:msg});  // redirect to user form page after inserting the data
}); 
});
  
module.exports = router;