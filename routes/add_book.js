var express = require('express');
var router = express.Router();
var db=require('../database');

router.post('/admin/catalog/:library', function(req, res, next) {
    
    var author_name = req.body.author_name;
    var book_name = req.body.book_name;
    var category = req.body.category;
    var blurb = req.body.blurb;
    var id = req.params.library;

         var query1=function(callback)
         {

             var sql=`CALL lb_add_book('${book_name}', '${blurb}', '${id}', '${author_name}', '${category}')`;
             db.query(sql, function (err, data, fields) {
               if (err) throw err;
               return callback(data);
             });
         };

         var query2=function(callback)
         {
     
              var sql=`(SELECT * FROM lb_catalog WHERE ID_library = '${id}' )`;
              db.query(sql, function (err, data, fields) {
                   if (err) throw err;
                   return callback(data);
                 });
             };

             query1(function(data){
                query2(function(data2){

                    var data_json = JSON.stringify(data2);
                    var data_json_parsed = JSON.parse(data_json);

                   var libraryID = id;

             res.render('catalog-admin', {bookData : data_json_parsed, library: id});
       })

});

});

module.exports = router;