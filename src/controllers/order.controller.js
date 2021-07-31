const Joi = require('@hapi/joi');

const validateOrder = (req, res, next) => {
    const schemaOrder = Joi.object({
        payment: Joi.number().positive().required(),
        user: Joi.number().positive().required(),
        products: Joi.array()
            .items(
                Joi.object({
                    id: Joi.number().positive().required(),
                    amount: Joi.number().positive().required(),
                })
            )
            .required(),
    });

    const { error } = schemaOrder.validate(req.body);

    if (error) return res.status(400).json({ error: error.details[0].message });

    next();
};

const validateUpdateOrder = (req, res, next) => {
    const schemaOrder = Joi.object({
        id: Joi.number().positive().required(),
        state: Joi.number().positive().required(),
    });

    const { error } = schemaOrder.validate(req.body);

    if (error) return res.status(400).json({ error: error.details[0].message });

    next();
};

module.exports = {
    validateOrder,
    validateUpdateOrder,
};
