# LinkMe
A Free &amp; Open Link Shortening Service

## Screenshots
The screenshots below shows LinkMe as of 16/09/2016
##### Link Shortening Screen
![Link Shortening Screen](http://i.imgur.com/vl67i7N.png)
##### Link Shortener Screen
![Link Shortened Screen](http://i.imgur.com/U5s1pz0.png)

## Contributing
You can contribute either by reporting issues or sending in pull requests
## Installing, Configuring & Running
To get LinkMe working the following steps should be sufficient, for optimal usage a Redis server is required
```
npm install

/* Set you 'port', 'host' and 'password' values at the top on LinkMe.js */
/* Set your 'LINKME_BASE_URL' value to the domain of your website eg. (Linkme.io,localhost)
this is what the shortened urls will be appended to */

node LinkMe.js

/* Browse to the server where the app is running and all should be good */

```
