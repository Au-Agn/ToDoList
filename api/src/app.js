const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const routerCategory = require('./routes/routeCategory');
const routerTask = require('./routes/routeTask');
const routerUser = require('./routes/routeUser');
const log = require('./logger/log');
var cors = require('cors');
const app = express();
const port = 3000;
const mongoURI = 'mongodb+srv://Au-ag:' + process.env.MONGO_ATLAS_PW + '@cluster0-ftl54.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(mongoURI,
  { useNewUrlParser: true }
);

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});

app.use(express.static(path.join(__dirname, '../../client/dist')));

app.use('/api', routerCategory);
app.use('/api', routerTask);
app.use('/api', routerUser);

app.listen(port, function () {
  log.info('app running port' + port);
});
