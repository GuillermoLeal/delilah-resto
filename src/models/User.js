module.exports = (sequelize, DataTypes, Role) => {
    return sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Username es un campo requerido',
                },
                len: {
                    args: [3, 25],
                    msg: 'Username tiene que tener entre 3 y 25 caracteres.',
                },
            },
        },
        fullname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Fullname es un campo requerido',
                },
                len: {
                    args: [3, 50],
                    msg: 'Fullname tiene que tener entre 3 y 50 caracteres.',
                },
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    args: true,
                    msg: 'El email no es válido',
                },
                notEmpty: {
                    args: true,
                    msg: 'Email es un campo requerido',
                },
                len: {
                    args: [3, 50],
                    msg: 'Email tiene que tener entre 3 y 50 caracteres.',
                },
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Password es un campo requerido',
                },
            },
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Phone es un campo requerido',
                },
                len: {
                    args: [5, 15],
                    msg: 'Phone tiene que tener entre 5 y 15 caracteres.',
                },
            },
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Address es un campo requerido',
                },
                len: {
                    args: [3, 50],
                    msg: 'Address tiene que tener entre 3 y 50 caracteres.',
                },
            },
        },
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Role,
                key: 'id',
            },
        },
    });
};
