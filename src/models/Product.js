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
                validate: {
                    notEmpty: {
                        args: true,
                        msg: 'Image es requerido',
                    },
                    isUrl: {
                        args: true,
                        msg: 'Image no es una URL valida',
                    },
                },
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: 'Name es requerido',
                    },
                    len: {
                        args: [1, 100],
                        msg: 'Name debe tener entre 1 y 100 caracteres',
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
