var express = require('express');
var router = express.Router();
var db=require('../database');

router.get('/:libraryid/book/:id', function(req, res, next) {

    var id = req.params.id;

    var query1=function(callback)
    {

         var sql=`(SELECT * FROM lb_book WHERE ID_book = '${id}' )`;
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

    var query3=function(callback)
            {

                var sql=`(SELECT availability FROM lb_catalog WHERE ID_book = '${id}' )`;
                db.query(sql, function (err, data, fields) {
                  if (err) throw err;
                  return callback(data);
                });
            };


        query1(function(data){
        query2(function(data2){
        query3(function(data3){
            console.log('Book data was displayed succesfully');
            
            var libraryID = req.params.libraryid;
            var data_json = JSON.stringify(data);
            var data_json_parsed = JSON.parse(data_json);
            var bookID = data_json_parsed[0].ID_book;
            
            var data_json_user =  JSON.stringify(data2);
            var data_json_user_parsed = JSON.parse(data_json_user);
            var userID = data_json_user_parsed[0].ID_user;

            var json_available = JSON.stringify(data3);
            var data_available = JSON.parse(json_available);
            var available = data_available[0].availability;
            console.log(data);

            res.render('show_book', {bookid: bookID, bookData : data_json_parsed, userdata: userID, librarydata: libraryID, availability: available});
      })
    })
});

});

module.exports = router;