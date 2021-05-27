var express = require('express');
var router = express.Router();
var db=require('../database');

router.get('/library/:libraryid/book/:id/user/:userid', function (req, res) {

    var bookID = req.params.id;
    var userID = req.params.userid;
    var libraryID = req.params.libraryid;

    var query1=function(callback)
    {
       var sql=`CALL lb_delete_from_list('${bookID}', '${userID}', '${libraryID}')`;
       db.query(sql, function (err, data, fields) {
        if (err) throw err;
        return callback(data);
      });
  };

  var query2=function(callback)
    {

         var sql=`(SELECT * FROM lb_booking_list WHERE ID_user = '${userID}' AND ID_library = '${libraryID}' )`;
         db.query(sql, function (err, data, fields) {
              if (err) throw err;
              return callback(data);
            });
    };

    query1(function(data){
        query2(function(data2){

           var data_json = JSON.stringify(data2);
           var data_json_parsed = JSON.parse(data_json);

            res.render('booking-list', {bookData : data_json_parsed, userdata: userID, library:libraryID});
       }
   )

})
});

module.exports = router;