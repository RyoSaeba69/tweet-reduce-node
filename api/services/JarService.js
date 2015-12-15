var sys = require('sys')
var exec = require('child_process').exec;
var fs = require('fs');
var rimraf = require('rimraf');

var jarPath = __dirname + '/../jar/tweet-reduce-1.0.jar';
var txtPath = __dirname + '/../../res.txt';
var outPath = __dirname + '/../jar/hadout';

var outRes = outPath + "/part-r-00000";


module.exports = {

  search: function(search, timeout, cb) {
    console.log("SEARCH ", search, " TIMEOUT ", timeout);
    timeout = timeout || 30000;
    exec("hadoop jar " + jarPath + " " + search + " " + timeout + " " + outPath, function(error, stdout, stderr) {

    //   console.log("ERR ", error, "OUT ", stdout, "STDERR ", stderr);
      var resFile = fs.readFileSync(outRes, 'utf8');
      //   console.log('RES '+resFile.split("\n"));


      var resMap = resFile.split("\n")
        .map(function(line) {
          var lineInfo = line
            .split('\t');
          return {
            word: lineInfo[0],
            count: lineInfo[1]
          };
        });

      rimraf(outPath, {}, function() {

      });
      rimraf(txtPath, {}, function() {

      });

      cb(resMap);



    });
  }

}
