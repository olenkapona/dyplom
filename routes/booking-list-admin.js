var express = require('express');
var router = express.Router();
var db=require('../database');

router.get('/admin/booking', function (req, res) {
    
        var email = req.session.email;
    
             var sql=`(SELECT a.* FROM lb_booking_list a, lb_rights b WHERE a.ID_library = b.ID_library AND b.email = '${email}' )`;
    
             db.query(sql, function (err, data) { 
                 if (err) throw err;
         
                 var data_json = JSON.stringify(data);
                 var data_json_parsed = JSON.parse(data_json);

                 res.render('booking-list-admin', {bookData : data_json_parsed});
           });
    
    });

module.exports = router;