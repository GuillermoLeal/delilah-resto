module.exports = (sequelize, DataTypes, Order, Product) => {
    return sequelize.define(
        'order_product',
        {
            orderId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: Order,
                    key: 'id',
                },
                validate: {
                    notEmpty: {
                        args: true,
                        msg: 'Order es requerido',
                    },
                },
            },
            productId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: Product,
                    key: 'id',
                },
                validate: {
                    notEmpty: {
                        args: true,
                        msg: 'Product es requerido',
                    },
                },
            },
            amount: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: 'Amount es requerido',
                    },
                    isInt: {
                        args: true,
                        msg: 'Amount debe ser un número entero',
                    },
                },
            },
            price: {
                type: DataTypes.FLOAT(11, 2),
                allowNull: false,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: 'Price es requerido',
                    },
                    isFloat: {
                        args: true,
                        msg: 'Price debe ser un número',
                    },
                },
            },
        },
        {
            sequelize,
            timestamps: false,
        }
    );
};
