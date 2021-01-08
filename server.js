const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');
const passportUtil = require('./utils/passport');
const {logError, handleError} = require('./middlewares/errorHandler');
const db = require('./db');
const config = require('./config');
const port = config.port;

db.init();

const whitelistOfCors = config.frontendBaseUrl.split(",");

const corsOptions = {
  origin: function(origin, callback) {
    const isWhitelisted = whitelistOfCors.indexOf(origin) !== -1;
    callback(null, isWhitelisted);
  },
  credentials:true
};

app.use(cors(corsOptions));

// 세션 활성화
app.use(session({ secret: 'dionysusSecret',
  resave: true,
  saveUninitialized: false,
  cookie: {
    path: "/",
    secure : false,
    maxAge : (4 * 60 * 60 * 1000)
  }}));

app.use(passport.initialize());
app.use(passport.session());
passportUtil.init();

app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({
  limit: '10mb',
  extended: true
}));

app.use(morgan('combined'));

app.use('/', require('./routes/index'));
app.use('/shows', require('./routes/shows'));

app.use((err, req, res, next) => logError(err, req, res, next));
app.use((err, req, res, next) => handleError(err, req, res, next));

app.disable('etag');
app.listen(port, () => {
  console.log('Express App on http port ' + port);
});

module.exports = app;
