const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotEnv = require("dotenv");
const indexRouter = require('./routes/index');
const connectDB = require('./config/db');
const v1Routes = require('./routes/v1');
dotEnv.config()
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./helper/swagger');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use('/v1/api', v1Routes);
connectDB();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
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

const port = process.env.PORT || 2556; 
app.listen(port, '0.0.0.0', () => { 
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
