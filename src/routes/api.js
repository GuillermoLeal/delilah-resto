const router = require('express').Router();

const apiAuth = require('./api/auth');
const apiUser = require('./api/user');
const apiProduct = require('./api/product');

router.use('/auth', apiAuth);
router.use('/user', apiUser);
router.use('/product', apiProduct);

module.exports = router;
