const Joi = require('@hapi/joi');

const validateProduct = (req, res, next) => {
    const schemaProduct = Joi.object({
        image: Joi.string().max(255).required(),
        name: Joi.string().min(1).max(50).required(),
        price: Joi.number().positive().precision(2).required(),
    });

    const { error } = schemaProduct.validate(req.body);

    if (error) return res.status(400).json({ error: error.details[0].message });

    next();
};

const validateUpdateProduct = (req, res, next) => {
    const schemaProduct = Joi.object({
        id: Joi.number().positive().precision(0).required(),
        image: Joi.string().max(255),
        name: Joi.string().min(1).max(50),
        price: Joi.number().positive().precision(2),
    });

    const { error } = schemaProduct.validate(req.body);

    if (error) return res.status(400).json({ error: error.details[0].message });

    next();
};

module.exports = {
    validateProduct,
    validateUpdateProduct,
};
