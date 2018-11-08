const createError = require('http-errors'),
  express = require('express'),
  path = require('path'),
  logger = require('morgan'),
  ejs = require('ejs'),
  bodyParser = require('body-parser');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, '../dist'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended:true } ));
// 访问静态资源文件 这里是访问所有dist目录下的静态资源文件
app.use(express.static(path.resolve(__dirname, '../dist')))
let count = 1;

app.get('/', function (req, res) {
  res.render('index.html')
})

app.use('/user', require('./routes/user.js'));
app.use('/admin',require('./routes/admin.js'))
app.use('/api',require('./routes/api.js'))
app.use('/static/ueditor', require('./routes/ue.js'))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
});
module.exports = app;
