// Conexión a Base de datos
const { Sequelize } = require('sequelize');
// Importar modelos
const UserModel = require('./models/User');
const RoleModel = require('./models/Role');

const { DB_USER, DB_PASSWORD, DB_DATABASE, DB_HOST } = process.env;

// Configuración de la conexión a la base de datos
const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
    port: 3306,
    logging: false,
});

// modelos de la base de datos
const Role = RoleModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize, Role);

// Sincronización de la base de datos
sequelize
    .sync({ force: false })
    .then(() => {
        console.log('Base de datos cargada');
    })
    .catch((err) => {
        console.log(err);
    });

module.exports = {
    User,
    Role,
};
