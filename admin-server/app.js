const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const testRouter = require('./routes/test');
const uploadRouter = require('./routes/upload');
const permissionRouter = require('./routes/permission');
const bdAiRouter = require('./routes/bdAi');//百度ai
const tokenTool = require('./utils/token.js')

const app = express();

// post载荷大小
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

// 统一验证token
app.use((req, res, next) => {
  let { authorization } = req.headers
  let { pathname } = req._parsedUrl
  let freeUrls = ['/login', '/', '/register', '/upload','/test', '/bdAi/ocr'] //不需要验证token的接口地址
  let isVerifyToken = freeUrls.indexOf(pathname) === -1 //是否需要验证token
  if (isVerifyToken) {
    let verifyToken = tokenTool.verifyToken(authorization)
    if (verifyToken === "Token Invalid") {
      res.send({ code: 1, msg: 'Token Invalid' })
    } else {
      next();
    }
  } else {
    next();
  }
});

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/test', testRouter);
app.use('/upload', uploadRouter);
app.use('/bdAi', bdAiRouter);
app.use('/permission', permissionRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
