/**
 * MapreduceController
 *
 * @description :: Server-side logic for managing mapreduces
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var sys = require('sys')
var exec = require('child_process').exec;

var jarPath = __dirname + '/../jar/tweet-reduce-1.0.jar';
var txtPath = __dirname + '/../jar/res.txt';
var outPath = __dirname + '/../jar/outout';

module.exports = {



  /**
   * `MapreduceController.countTweets()`
   */
  countTweets: function(req, res) {
      console.log("MOOODE ", req.params.mode);

      var secTimeout = req.params.time * 1000;

    //   req.connection.setTimeout(secTimeout + 10000); // timeout + 10s
      req.connection.setTimeout(0); // timeout + 10s
      console.log("COUNT TWEET");
    JarService.search(req.params.search, secTimeout, req.params.mode,function(result) {
        return res.json(result)
	});


  }
};
