const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User, Order } = require('../database');

const validateRegister = async (req, res, next) => {
    // Validar email y usuario unico
    const isEmailExist = await User.findOne({
        where: { email: req.body.email },
    });

    if (isEmailExist) {
        return res.status(400).json({ error: 'Email ya registrado' });
    }

    next();
};

const validateLogin = async (req, res, next) => {
    const user = await User.findOne({ where: { email: req.body.email } });

    let validPassword = false;
    if (!!user) {
        validPassword = await bcrypt.compare(req.body.password, user.password);
    }

    if (!user || !validPassword)
        return res.status(400).json({
            error: 'Credenciales no validas... Por favor verifique los datos',
        });

    req.user = user;
    next();
};

const validateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader)
            return res.status(401).send({
                error: "Se debe prover un header 'Authorization' con el formato: 'Bearer <Token>'",
            });

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

        if (decoded) {
            req.auth = decoded;
            return next();
        }

        return res.status(401).json({ error: 'Token invalido' });
    } catch (err) {
        return res.status(401).send({
            error: 'Token invalido. Debe proverse con el formato: "Bearer <token>"',
        });
    }
};

const authorizeRoleAdmin = (req, res, next) => {
    const { role } = req.auth;
    if (role !== 1) return res.status(403).send({ error: 'No autorizado' });
    next();
};

const validateOrderUser = async (req, res, next) => {
    const { id } = req.auth;

    const orden = await Order.findOne({
        where: { id: req.params.id, userId: id },
    });

    // Si el usuario llama una orden que no le pertenece
    if (!orden) return res.status(403).send({ error: 'Orden no encontrada' });

    next();
};

module.exports = {
    validateRegister,
    validateLogin,
    validateToken,
    authorizeRoleAdmin,
    validateOrderUser,
};
