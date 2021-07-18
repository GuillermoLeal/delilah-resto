const router = require('express').Router();
const { Product } = require('../../database');
const { validateProduct } = require('../../controllers/product.controller');

// ? Obtener todos los productos
router.get('/', async (req, res) => {
    const { limit, offset } = req.params;

    const products = await Product.findAll({
        limit: limit || 10,
        offset: offset || 0,
    });

    res.json({ err: null, data: products });
});

// ? Agregar un producto
router.push('/', validateProduct, async (req, res) => {
    try {
        // create product
        const product = await Product.create({
            image: req.body.image,
            name: req.body.name,
            price: req.body.price,
        });

        const { image, name, price } = product;

        res.json({
            error: null,
            data: { image, name, price },
        });
    } catch (error) {
        return res.status(500).json({ error });
    }
});

module.exports = router;
