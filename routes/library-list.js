var express = require('express');
var router = express.Router();
var db=require('../database');

router.get('/library-list', function(req, res, next) {
    if(req.session.loggedinUser){

            var email = req.session.email;
            // first query
            var query1=function(callback)
            {
            var sql='SELECT * FROM lb_library_list';
                db.query(sql, function (err, data, fields) {
                if (err) throw err;
                return callback(data);
                });

            }
            // query2
            var query2=function(callback)
            {
            var sql = `(SELECT full_name FROM lb_users WHERE email = '${email}' LIMIT 1)`;
                db.query(sql, function (err, data, fields) {
                if (err) throw err;
                return callback(data);
            });

            }
            // render to same page
            query1(function(data){
            query2(function(data2){
                var fname = data2[0].full_name;
                var data_json = JSON.stringify(data);
                var data_json_parsed = JSON.parse(data_json);
                if(fname == 'admin'){
                    res.render('admin_func');
                }
            res.render('library-list', { title: 'User List', userData: data_json_parsed, userData2: fname});
            });

            });
        }else{
                res.redirect('/login');
            }
            });


module.exports = router;