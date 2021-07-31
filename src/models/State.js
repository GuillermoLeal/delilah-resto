module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'state',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
        },
        {
            sequelize,
            timestamps: false,
        }
    );
};
