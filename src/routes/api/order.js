const router = require('express').Router();
const {
    sequelize,
    Sequelize,
    Order,
    Product,
    OrderProduct,
    State,
    Payment,
    User,
} = require('../../database');
const { authorizeRoleAdmin } = require('../../controllers/auth.controller');
const {
    validateOrder,
    validateUpdateOrder,
} = require('../../controllers/order.controller');

// ? Obtener todas las ordenes
router.get('/', async (req, res) => {
    const { limit, offset } = req.query;

    const orders = await sequelize.query(
        `SELECT o.id id, o.description, o.date, s.id stateId, s.name state, u.id userId, 
            u.fullname user, u.address address, py.id paymentId, py.name payment
        FROM orders o
        JOIN states s ON o.stateId = s.id
        JOIN payments py ON o.paymentId = py.id
        JOIN users u ON o.userId = u.id
        LIMIT :_limit OFFSET :_offset`,
        {
            replacements: {
                _limit: limit || 10,
                _offset: offset || 0,
            },
            type: Sequelize.QueryTypes.SELECT,
        }
    );

    res.json({ error: null, data: orders });
});

// ? Obtener orden por id
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const order = await sequelize.query(
        `SELECT o.id id, o.description, o.date, s.id stateId, s.name state, u.id userId, 
            u.fullname user, u.address address, py.id paymentId, py.name payment
        FROM orders o
        JOIN states s ON o.stateId = s.id
        JOIN payments py ON o.paymentId = py.id
        JOIN users u ON o.userId = u.id
        WHERE o.id= :_id`,
        {
            replacements: {
                _id: id,
            },
            type: Sequelize.QueryTypes.SELECT,
        }
    );

    const orderProducts = await sequelize.query(
        `SELECT p.id, p.name, p.image, p.price, op.amount
        FROM order_products op
        JOIN products p ON op.productId = p.id 
        WHERE op.orderId= :_id`,
        {
            replacements: {
                _id: id,
            },
            type: Sequelize.QueryTypes.SELECT,
        }
    );

    if (order.length < 1) {
        res.status(404).json({ error: 'No existe la orden solicitada' });
    }

    order[0].products = orderProducts;

    res.json({ error: null, data: order[0] });
});

// ? Agregar una orden
router.post('/', validateOrder, async (req, res) => {
    try {
        const { payment, user, products } = req.body;

        let description = '';
        for (let i = 0; i < products.length; i++) {
            const p = products[i];
            const product = await Product.findByPk(p.id);
            description += `${p.amount}x${product.name} `;
        }
        // crear orden
        const order = await Order.create({
            description,
            stateId: 1,
            paymentId: payment,
            userId: user,
        });
        // agregar productos a la orden
        const orderProducts = [];
        for (let i = 0; i < products.length; i++) {
            const { id, amount } = products[i];
            const product = await OrderProduct.create({
                orderId: order.id,
                productId: id,
                amount: amount,
            });

            orderProducts.push(product);
        }

        const stateObj = await State.findByPk(order.stateId);
        const paymentObj = await Payment.findByPk(order.paymentId);
        const userObj = await User.findByPk(order.userId);

        res.json({
            error: null,
            data: {
                id: order.id,
                description: order.description,
                date: order.date,
                stateId: order.stateId,
                state: stateObj.name,
                paymentId: order.paymentId,
                payment: paymentObj.name,
                userId: order.userId,
                user: userObj.fullname,
                address: userObj.address,
            },
        });
    } catch (error) {
        return res.status(500).json({ error });
    }
});

// ? Actualizar stado de orden
router.put('/', authorizeRoleAdmin, validateUpdateOrder, async (req, res) => {
    try {
        const { id, state } = req.body;

        const stateObj = await State.findByPk(state);
        if (stateObj == null) {
            res.status(404).json({ error: 'No existe el estado solicitado' });
        }
        // actualizar orden
        const updateOrder = await Order.update(
            {
                stateId: state,
            },
            { where: { id } }
        );

        if (updateOrder[0] < 1) {
            res.status(404).json({
                error: 'No se pudo actualizar la orden',
            });
        }

        res.json({
            error: null,
            data: 'Orden actualizada correctamente!',
        });
    } catch (error) {
        return res.status(500).json({ error });
    }
});

module.exports = router;
