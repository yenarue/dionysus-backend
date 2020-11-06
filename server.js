const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const packagejson = require('./package.json');
const {logError, handleError} = require('./middleware/errorHandler');
const db = require('./db');
const config = require('./config');
const port = config.port;
const cors = require('cors');

// db.init();

const whitelistOfCors = config.frontendBaseUrl.split(",");

const corsOptions = {
  origin: function(origin, callback) {
    const isWhitelisted = whitelistOfCors.indexOf(origin) !== -1;
    callback(null, isWhitelisted);
  },
  credentials:true
};

app.use(cors(corsOptions));

app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({
  limit: '10mb',
  extended: true
}));

app.use(morgan('combined'));

app.get('/', (req, res) => {
  res.send('Hello Dionysus Backend (' + process.env.NODE_ENV + ' v' +  packagejson.version +')');
});

// app.use('/user', usersRouter);

app.use((err, req, res, next) => logError(err, req, res, next));
app.use((err, req, res, next) => handleError(err, req, res, next));

app.listen(port, () => {
  console.log('Express App on http port ' + port);
});

module.exports = app;
