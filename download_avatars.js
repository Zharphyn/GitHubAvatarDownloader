/*jshint esversion: 6 */

var request = require('request');
var token = require('./token');
const username = 'Zharphyn';
const globalURL = 'https://api.github.com/repos/';

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: globalURL + repoOwner + "/" + repoName + "/contributors",
    
    headers: {
      'User-Agent': 'request',
      'Authorization' : "token " + token 
    }
  };

  //var url = globalURL + repoOwner + "/" + repoName + "/contributors";
  
  request(options, function(err, res, body) {
    cb(err, body);
    
  });
}

 getRepoContributors('jquery','jquery', function(err, result) {
  // console.log("Errors:", err);
  // console.log("Result:", result);
   var org = JSON.parse(result);
   for (var item in org){
   	console.log(org[item].avatar_url);
   }
   
 });