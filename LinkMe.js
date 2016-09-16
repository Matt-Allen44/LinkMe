var crypto = require('crypto');
var express = require('express');
var linkme = express();

//Default starter appended to the link eg. http://www.link.me/{HashHere}
var LINKME_BASE_URL = 'localhost'

var shortURLs = new Object(); // or var map = {};


var ShortenLink = function(url){
  //Hash function using md5 and return chars 0-10 for a shorter link
  //Definant potential for hash collision though -- LIMITATION SHOULD BE DEALT WITH
  return crypto.createHash('md5').update(url).digest('hex').substr(0,6);
};

var sendToRedis = function(shortURL, longURL){
  shortURLs[shortURL] = longURL;
};

var fetchFromRedis = function(shortURL){
  console.log('FETCHED ' + shortURL + " --> " + shortURLs[shortURL])
  return shortURLs[shortURL];
};

linkme.get('/shorten', function(req, res){
  res.status(200);
  console.log('Shortened ' + req.query.url + " to /" + ShortenLink(req.query.url));
  sendToRedis('/' + ShortenLink(req.query.url), req.query.url);
  res.sendFile(__dirname  + '/showurl.html');
});


linkme.get('/', function(req, res){
  res.status(200);
  res.sendFile(__dirname  + '/linkme.html');
});

linkme.get('*', function(req, res){
  res.writeHead(301,
  {Location: shortURLs[req.originalUrl]}
);
  res.end();
});

linkme.listen(80, function(){
  console.log('Listening on :80')
});
