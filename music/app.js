// app.js
const express = require('express');
const bodyParser = require('body-parser');
const music = require('./routes/music.route'); // Imports routes for the products.
const http = require('http');
const path=require('path');

// initialize our express app
const app = express();
// // public app
// app.get('/',function(req,res){
// 	return res.redirect('/public/music/index.html');
// });
app.use(express.static(__dirname + '/public/music'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://affan:National%240@music-shard-00-00-zdrsd.mongodb.net:27017,music-shard-00-01-zdrsd.mongodb.net:27017,music-shard-00-02-zdrsd.mongodb.net:27017/test?ssl=true&replicaSet=music-shard-0&authSource=admin&retryWrites=true';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let version = '/api/v1';

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(version+'/list', music);
// hitting   http://localhost:1234/list/test
let port = process.env.PORT || 4201;

// Catch all other routes and return the index file
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname));
  });
const server= http.createServer(app);  

server.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});