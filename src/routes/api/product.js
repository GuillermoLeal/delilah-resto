const router = require('express').Router();
const { Product } = require('../../database');
const {
    validateProduct,
    validateUpdateProduct,
} = require('../../controllers/product.controller');

// ? Obtener todos los productos
router.get('/', async (req, res) => {
    const { limit, offset } = req.params;

    const products = await Product.findAll({
        limit: limit || 10,
        offset: offset || 0,
    });

    res.json({ err: null, data: products });
});

// ? Obtener producto por id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (product == null) {
        res.status(404).json({ err: 'No existe el producto solicitado' });
    }

    res.json({ err: null, data: product });
});

// ? Agregar un producto
router.post('/', validateProduct, async (req, res) => {
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

// ? Actualizar un producto
router.put('/', validateUpdateProduct, async (req, res) => {
    try {
        const { id, image, name, price } = req.body;

        const product = await Product.findByPk(id);
        if (product == null) {
            res.status(404).json({ err: 'No existe el producto solicitado' });
        }
        // update product
        const updateProduct = await Product.update(
            {
                image: !!image ? image : product.image,
                name: !!name ? name : product.name,
                price: !!price ? price : product.price,
            },
            { where: { id } }
        );

        if (updateProduct == null) {
            res.status(404).json({ err: 'No se pudo actualizar el producto' });
        }

        res.json({
            error: null,
            data: 'Producto actualizado correctamente!',
        });
    } catch (error) {
        return res.status(500).json({ error });
    }
});

// ? Eliminar un producto
router.delete('/', async (req, res) => {
    try {
        const { id } = req.query;

        // delete product
        const deleteProduct = await Producto.destroy({ where: { id } });

        if (deleteProduct == null) {
            res.status(404).json({ err: 'No se pudo eliminar el producto' });
        }

        res.json({
            error: null,
            data: 'Producto eliminado correctamente!',
        });
    } catch (error) {
        return res.status(500).json({ error });
    }
});

module.exports = router;
