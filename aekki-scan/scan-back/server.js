// grab the packages we need
var express = require('express');
var app = express();
var exec = require('child_process').exec;
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
})); // support encoded bodies

var port = process.env.PORT || 8080;

// routes will go here
// app.get('/api/users', function(req, res) {
//   var user_id = req.param('id');
//   var token = req.param('token');
//   var geo = req.param('geo');
//
//   res.send(user_id + ' ' + token + ' ' + geo);
// });
//eg: http://example.com/api/users?id=4&token=sdfa3&geo=us


// POST http://localhost:8080/api/users
// parameters sent with


function runpipeline() {
  return new Promise((resolve, reject) => {
    exec("./pipeline a2.jpg", function(error, stdout, stderr) {
      if (error) {
        reject(stderr);
      } else {
        resolve(stdout);
        // resolve('out_a2.jpg');

      }
    });
  });
}

// var runpipeline =  new Promise(function(resolve, reject) {
//   exec("./pipeline a2.jpg", function(error, stdout, stderr) {
//     if (!error) {
//
//       // things worked!
//       // console.log(stdout)
//       console.log('done')
//       resolve(stdout);
//     } else {
//       // things failed :(
//     }
//   });
// })

// var promise1 = new Promise(function(resolve, reject) {
//   resolve('Success!');
// });

// promise1.then(function(value) {
//   console.log(value);
//   // expected output: "Success!"
// });


app.post('/api/scanitem', function(req, res) {
  // var user_id = req.body.id;
  // var token = req.body.token;
  // var geo = req.body.geo;
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.contentType('image/jpeg');
  runpipeline().then(function(result) {
    console.log(result); // "Stuff worked!"
    var image = fs.createReadStream('./output/'+result.trim())
    image.pipe(res);
  }, function(err) {
    console.log(err); // Error: "It broke"
  });
});

// headers: {
//     'cache-control': 'no-cache',
//     'content-disposition': 'attachment; filename='+filename,
//     'content-type' : 'image/jpg',
//     'authorization' : 'Basic token'
//   },
//   encoding: null,
//   method: 'POST',
// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);
