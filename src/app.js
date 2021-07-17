const express = require('express');
const cors = require('cors');
const app = express();

const apiRoutes = require('./routes/api');

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
app.use('/api', apiRoutes);

module.exports = app;
