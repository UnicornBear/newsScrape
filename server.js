// dependencies
const express = require('express');
const bodyParser = require('body-parser');
const logger  = require('morgan');
const mongoose = require('mongoose');
const expressHandlebars = require('express-handlebars');


// initialize express
let PORT = process.env.PORT || 3000;

// set mongodb
let MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/newsScrape';
//let MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines';

const app = express();

// use logger for logging requests
app.use(logger('dev'));

// use body-parser for handling forms
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

// set public as static directory
app.use(express.static('public'));

// initialize handlebars
app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// database configure utilizing mongoose
mongoose.Promise = global.Promise;

// connect to the Mongo DB
mongoose.connect(
    process.env.MONGODB_URI || 
    'mongodb://user:password1@ds235840.mlab.com:35840/heroku_sthcmjmp',
    { 
        useNewUrlParser: true 
    }
);

// report mongoose error connections
let db = mongoose.connection;
db.on('error', (error)=>{
    console.log(`Connection error ${error}`);
});

// routes - elected to make a routes.js file and place seperate
// routing
require('./routes/routes.js')(app);


// start server on PORT = ?
// try removing out funtion for ()=>
app.listen(PORT, ()=>{
    console.log(`App running on port ${PORT}`);
});