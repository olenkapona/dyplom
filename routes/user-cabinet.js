var express = require('express');
var router = express.Router();
var db=require('../database');

router.get('/:libraryid/user/:userid', function (req, res) {
    var userID = req.params.userid;
    var libraryID = req.params.libraryid;

    var sql=`(SELECT * FROM lb_booking_list WHERE ID_user = '${userID}' AND ID_library = '${libraryID}' )`;
         

    db.query(sql, function (err, data) { 
        if (err) throw err;

        var data_json = JSON.stringify(data);
        var data_json_parsed = JSON.parse(data_json);
        console.log(data_json_parsed);
        res.render('booking-list', {bookData : data_json_parsed, userdata:userID, library:libraryID});
  });
});

module.exports = router;