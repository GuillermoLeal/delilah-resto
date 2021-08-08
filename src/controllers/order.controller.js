const { User, Payment, State } = require('../database');

const validateOrder = async (req, res, next) => {
    const { payment, user } = req.body;

    const paymentDb = await Payment.findByPk(payment);
    if (paymentDb == null) {
        res.status(404).json({
            error: 'No existe el metodo de pago ingresado',
        });
    }

    const userDb = await User.findByPk(user);
    if (userDb == null) {
        res.status(404).json({
            error: 'No existe el usuario ingresado',
        });
    }

    req.userDB = userDb;
    req.paymentDB = paymentDb;
    next();
};

const validateUpdateOrder = async (req, res, next) => {
    const { state } = req.body;

    const stateObj = await State.findByPk(state);
    if (stateObj == null) {
        res.status(404).json({ error: 'No existe el estado solicitado' });
    }

    next();
};

module.exports = {
    validateOrder,
    validateUpdateOrder,
};
