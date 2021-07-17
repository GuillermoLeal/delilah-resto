const Joi = require('@hapi/joi');

const validateRegister = (body) => {
    const schemaRegister = Joi.object({
        username: Joi.string().min(5).max(255).required(),
        fullname: Joi.string().min(6).max(255).required(),
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(6).max(255).required(),
        phone: Joi.string().min(6).max(255).required(),
        address: Joi.string().min(6).max(255).required(),
    });

    return schemaRegister.validate(body);
};

const validateLogin = (body) => {
    const schemaLogin = Joi.object({
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(6).max(255).required(),
    });

    return schemaLogin.validate(body);
};

module.exports = {
    validateRegister,
    validateLogin,
};
