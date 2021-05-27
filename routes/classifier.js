var express = require('express');
const con = require('../database');
var app = express();
var router = express.Router();
  
// Function callName() is executed whenever 
// url is of the form localhost:3000/getblurb
router.get('/getblurb', callName);

  
function callName(req, res) {
      
    // Use child_process.spawn method from 
    // child_process module and assign it
    // to variable spawn
    var spawn = require("child_process").spawn;
      
    // Parameters passed in spawn -
    // 1. type_of_script
    // 2. list containing Path of the script
    //    and arguments for the script 

    // http://localhost:3000/getblurb?blurb
    var process = spawn('python',["C:/Users/Olena/PycharmProjects/untitled1/run_saved_doc2vec.py",
                            req.query.blurb]);
    console.log("Process spawned!");

    // Takes stdout data from script which executed
    // with arguments and send this data to res object
    process.stdout.on('data', function(data) {

      data_arr = data.toString().split(/\r?\n/);

      res.render('classifier-view',{classifier_data: data_arr});
    } )

    // return error if smth is wrong
    process.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
      });

    
}

  
module.exports = router;