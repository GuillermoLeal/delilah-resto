const router = require('express').Router();

const apiAuth = require('./api/auth');

router.use('/auth', apiAuth);

module.exports = router;
