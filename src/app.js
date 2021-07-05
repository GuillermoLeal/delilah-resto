const express = require('express');
const cors = require('cors');
const app = express();

// Settins
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// routes
app.use('/api', require('./routes/auth.routes'));

module.exports = app;
