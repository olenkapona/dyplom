var express = require('express');
var router = express.Router();
var db=require('../database');

router.get('/admin/catalog', function(req, res, next) {
    
    var email = req.session.email;

         var sql=`(SELECT a.* FROM lb_catalog a, lb_rights b WHERE a.ID_library = b.ID_library AND b.email = '${email}' )`;

         db.query(sql, function (err, data) { 
             if (err) throw err;
     
             var data_json = JSON.stringify(data);
             var data_json_parsed = JSON.parse(data_json);
             var library_ID = data_json_parsed[0].ID_library;
             console.log(library_ID);
             res.render('catalog-admin', {bookData : data_json_parsed, library: library_ID});
       });

});

module.exports = router;