var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const {MongoClient} = require('mongodb');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/Login');
var signupRouter = require('./routes/SignUp');
var app = express();
const uri= 'mongodb://localhost:27017';
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
var cors = require('cors');
app.use(cors());
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/log', loginRouter);
app.use('/signup', signupRouter);
let Client;
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
async function connect(){
    Client = await MongoClient.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
    Client.connect().then(() => {

        console.log("Connected to database client");
    }
    ).catch((err) => {
        console.log(err);
    }
    );
}
connect();
module.exports = app;
