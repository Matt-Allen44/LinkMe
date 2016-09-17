var crypto = require('crypto');
var express = require('express');
var linkme = express();

var redis = require('redis');
var redisClient = redis.createClient(/*PORT*/, /*IP*/);
    redisClient.auth(/*PASSWORD*/, function(err) {
        if (err) throw err;
    });
redisClient.select(3); // Using DB3 as I'm already using the other on my server

//Default starter appended to the link eg. http://www.link.me/{HashHere}
var LINKME_BASE_URL = 'localhost';

var shortURLs = {}; // or var map = {};


var ShortenLink = function(url){
  //Hash function using md5 and return chars 0-10 for a shorter link
  //Definant potential for hash collision though -- LIMITATION SHOULD BE DEALT WITH
  return crypto.createHash('md5').update(url).digest('hex').substr(0,6);
};

var sendToRedis = function(shortURL, longURL){
  redisClient.lpush(shortURL, longURL); // push into redis
};

var fetchFromRedis = function(shortURL){
  redisClient.lrange(shortURL, 1, -1, function(err, reply) {
      if (err) {
          res.status(422);
          res.end("Lookup failed for " + shortURL);
      }

      return reply;
  });
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
  if(shortURLs[req.originalUrl] !== undefined){
    res.writeHead(301,
    {Location: shortURLs[req.originalUrl]}
    );
    res.end();
  } else {
    res.writeHead(301,
    {Location: '/'}
    );
    res.end();
  }
});

linkme.listen(80, function(){
  console.log('Listening on :80');
});
