const router = require('express').Router();
const { validateToken } = require('../controllers/auth.controller');
const apiAuth = require('./api/auth');
const apiUser = require('./api/user');
const apiProduct = require('./api/product');
const apiOrder = require('./api/order');

router.use('/auth', apiAuth);
router.use('/user', validateToken, apiUser);
router.use('/product', validateToken, apiProduct);
router.use('/order', validateToken, apiOrder);

module.exports = router;
