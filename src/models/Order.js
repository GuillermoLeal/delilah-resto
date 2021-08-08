module.exports = (sequelize, DataTypes, State, Payment, User) => {
    return sequelize.define(
        'order',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: '',
                validate: {
                    notEmpty: {
                        args: true,
                        msg: 'Description es requerido',
                    },
                    len: {
                        args: [1, 100],
                        msg: 'Description debe tener entre 1 y 100 caracteres',
                    },
                },
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: 'Date es requerido',
                    },
                },
            },
            stateId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: State,
                    key: 'id',
                },
                validate: {
                    notEmpty: {
                        args: true,
                        msg: 'State es requerido',
                    },
                },
            },
            paymentId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: Payment,
                    key: 'id',
                },
                validate: {
                    notEmpty: {
                        args: true,
                        msg: 'Payment es requerido',
                    },
                },
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: User,
                    key: 'id',
                },
                validate: {
                    notEmpty: {
                        args: true,
                        msg: 'User es requerido',
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
