var express = require('express');
var router = express.Router();
var db=require('../database');

router.get('/catalog/:id', function(req, res, next) {
    
    var id = req.params.id;
    var query1=function(callback)
    {

         var sql=`(SELECT * FROM lb_catalog WHERE ID_library = '${id}' )`;
         db.query(sql, function (err, data, fields) {
              if (err) throw err;
              return callback(data);
            });
        };
    var query2=function(callback)
            {
                var email = req.session.email;
                console.log(email);
                var sql=`(SELECT ID_user FROM lb_users WHERE email = '${email}' )`;
                db.query(sql, function (err, data, fields) {
                  if (err) throw err;
                  return callback(data);
                });
            };

            query1(function(data){
                  query2(function(data2){
                      
                        var data_json = JSON.stringify(data);
                       var data_json_parsed = JSON.parse(data_json);
                      var bookID = data_json_parsed[0].ID_book;
                      var available = data_json_parsed[0].availability;
                      
                      var data_json_user =  JSON.stringify(data2);
                      var data_json_user_parsed = JSON.parse(data_json_user);
                      var userID = data_json_user_parsed[0].ID_user;

                      var libraryID = id;
                      

          
                      res.render('catalog', {bookid: bookID, libraryData : data_json_parsed, userdata: userID, librarydata: libraryID, availability: available});
                })
            });

});

module.exports = router;