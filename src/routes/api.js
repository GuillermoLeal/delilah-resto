const router = require('express').Router();

const apiAuth = require('./api/auth');
const apiUser = require('./api/user');

router.use('/auth', apiAuth);
router.use('/user', apiUser);

module.exports = router;
