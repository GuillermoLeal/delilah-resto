module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'product',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            image: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            price: {
                type: DataTypes.FLOAT(11, 2),
                allowNull: false,
            },
        },
        {
            sequelize,
            timestamps: false,
        }
    );
};
