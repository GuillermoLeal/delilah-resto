module.exports = (sequelize, DataTypes, State, Payment, User) => {
    return sequelize.define(
        'Order',
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
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            stateId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: State,
                    key: 'id',
                },
            },
            paymentId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: Payment,
                    key: 'id',
                },
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: User,
                    key: 'id',
                },
            },
        },
        {
            sequelize,
            timestamps: false,
        }
    );
};
