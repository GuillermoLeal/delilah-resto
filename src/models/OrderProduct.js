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
            },
            productId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: Product,
                    key: 'id',
                },
            },
            amount: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            timestamps: false,
        }
    );
};
