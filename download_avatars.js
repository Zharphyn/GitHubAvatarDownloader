/*jshint esversion: 6 */

var request = require('request');
var token = require('./token');
var fs = require('fs');

const username = 'Zharphyn';
const globalURL = 'https://api.github.com/repos/';
let owner = '';
let name = '';


function getOptions(repoOwner, repoName) {
  var options = {
    url: globalURL + repoOwner + "/" + repoName + "/contributors",
    
    headers: {
      'User-Agent': 'request',
      'Authorization': "token " + token
    }
  };
  return options;
}

function getRepoContributors(repoOwner, repoName, cb) {
  request(getOptions(repoOwner, repoName), function(err, res, body) {
    cb(err, res, body);
  });
}

// takes a passed url, and write contents to a file
function downloadImageByURL(url, filePath) {
  request.get(url, function(err, res, body){
    if (err){
      console.log(err);
    }
    console.log('Downloading...' + url);
  })
    .pipe(fs.createWriteStream(filePath));

}

var callback = function(err, res){
  console.log(res);
};

function getOwnerAndName(){
  if (process.argv.length >= 4) {
    owner = process.argv[2];
    name = process.argv[3];
  } else {
    console.log('Please supply the owner and name of the repository.');
    return false;
  }
  return true;
}

console.log('Welcome to the GitHub Avatar Downloader!');
if (getOwnerAndName()) {
  getRepoContributors(owner, name, function(err, res, body) {
    var org = JSON.parse(body);
    for (var item in org){
      var filepath = `./images/${org[item].login}.jpg`;
      downloadImageByURL(org[item].avatar_url, filepath);
      if (err) {
        console.log(err);
      }
    }
  });
}


