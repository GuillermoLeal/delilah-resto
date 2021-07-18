const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const { User } = require('../database');

const validateRegister = async (req, res, next) => {
    const schemaRegister = Joi.object({
        username: Joi.string().min(5).max(255).required(),
        fullname: Joi.string().min(6).max(255).required(),
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(6).max(255).required(),
        phone: Joi.string().min(6).max(255).required(),
        address: Joi.string().min(6).max(255).required(),
    });

    const { error } = schemaRegister.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

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
    const schemaLogin = Joi.object({
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(6).max(255).required(),
    });

    const { error } = schemaLogin.validate(req.body);

    if (error) return res.status(400).json({ error: error.details[0].message });

    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });

    const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
    );
    if (!validPassword)
        return res.status(400).json({ error: 'contraseña no válida' });

    req.user = user;
    next();
};

module.exports = {
    validateRegister,
    validateLogin,
};
