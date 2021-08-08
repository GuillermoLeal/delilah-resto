const router = require('express').Router();
const { Product } = require('../../database');
const { authorizeRoleAdmin } = require('../../controllers/auth.controller');

// ? Obtener todos los productos
router.get('/', async (req, res) => {
    const { limit, offset } = req.query;

    const products = await Product.findAll({
        limit: limit || 10,
        offset: offset || 0,
    });

    res.json({ error: null, data: products });
});

// ? Obtener producto por id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (product == null) {
        res.status(404).json({ error: 'No existe el producto solicitado' });
    }

    res.json({ error: null, data: product });
});

// ? Agregar un producto
router.post('/', authorizeRoleAdmin, async (req, res) => {
    try {
        // craar producto
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
        const errors = error.errors.map((err) => err.message);
        res.status(500).json({ error: errors });
    }
});

// ? Actualizar un producto
router.put('/', authorizeRoleAdmin, async (req, res) => {
    try {
        const { id, image, name, price } = req.body;

        const product = await Product.findByPk(id);
        if (product == null) {
            res.status(404).json({
                err: 'No existe el producto solicitado',
            });
        }
        // actualizar producto
        const updateProduct = await Product.update(
            {
                image: !!image ? image : product.image,
                name: !!name ? name : product.name,
                price: !!price ? price : product.price,
            },
            { where: { id } }
        );

        if (updateProduct[0] < 1) {
            res.status(404).json({
                error: 'No se pudo actualizar el producto',
            });
        }

        res.json({
            error: null,
            data: 'Producto actualizado correctamente!',
        });
    } catch (error) {
        const errors = error.errors.map((err) => err.message);
        res.status(500).json({ error: errors });
    }
});

// ? Eliminar un producto
router.delete('/', authorizeRoleAdmin, async (req, res) => {
    try {
        const { id } = req.query;

        // eliminar producto
        const deleteProduct = await Product.destroy({ where: { id } });

        if (!deleteProduct) {
            res.status(404).json({ error: 'No se pudo eliminar el producto' });
        }

        res.json({
            error: null,
            data: 'Producto eliminado correctamente!',
        });
    } catch (error) {
        const errors = error.errors.map((err) => err.message);
        res.status(500).json({ error: errors });
    }
});

module.exports = router;
