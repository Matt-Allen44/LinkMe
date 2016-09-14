var crypto = require('crypto');
var express = require('express');
var linkme = express();

//Default starter appended to the link eg. http://www.link.me/{HashHere}
var LINKME_BASE_URL = 'localhost'

var ShortenLink = function(url){
  //Hash function using md5 and return chars 0-10 for a shorter link
  //Definant potential for hash collision though -- LIMITATION SHOULD BE DEALT WITH
  return crypto.createHash('md5').update(url).digest('hex').substr(0,10);
};

var sendToRedis = function(shortURL, longURL){

};

var fetchFromRedis = function(shortURL, longURL){

};

linkme.get('/shorten', function(req, res){
  res.status(200);
  res.end(LINKME_BASE_URL + '/' + ShortenLink(req.query.url));
});

linkme.get('*', function(req, res){
  res.status(200);
  res.write('OK: ' + req.originalUrl);
  res.end('Redirect to: ' )
});

linkme.listen(80, function(){
  console.log('Listening on :80')
});
console.log(ShortenLink('www.google.com'));
console.log(ShortenLink('www.reddit.com'));
console.log(ShortenLink('www.reddit.com/r/cscareerquestions/comments/52jcx4/resume_advice_thread_september_13_2016/'));
