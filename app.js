var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var libraryList = require('./routes/library-list');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var catalogRouter = require('./routes/catalog');
var classifier = require('./routes/classifier');
var bookinfo = require('./routes/show_book');
var stored_proc_status = require('./routes/update_status');
var user_cabinet = require('./routes/user-cabinet');
var remove_book = require('./routes/remove-book');
var catalog_admin = require('./routes/catalog-admin');
var add_book = require('./routes/add_book');
var booking_list_admin = require('./routes/booking-list-admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ 
  secret: '123456cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', libraryList);
app.use('/', loginRouter);
app.use('/', logoutRouter);
app.use('/', logoutRouter);
app.use('/', catalogRouter);
app.use('/', classifier);
app.use('/', bookinfo);
app.use('/', stored_proc_status);
app.use('/', user_cabinet);
app.use('/', remove_book);
app.use('/', catalog_admin);
app.use('/', add_book);
app.use('/', booking_list_admin);

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

module.exports = app;
