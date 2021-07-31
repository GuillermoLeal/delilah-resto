// Conexión a Base de datos
const { Sequelize } = require('sequelize');
// Importar modelos
const UserModel = require('./models/User');
const RoleModel = require('./models/Role');
const StateModel = require('./models/State');
const PaymentModel = require('./models/Payment');
const ProductModel = require('./models/Product');
const OrderModel = require('./models/Order');
const OrderProductModel = require('./models/OrderProduct');

// Configuración de la conexión a la base de datos
const { DB_USER, DB_PASSWORD, DB_DATABASE, DB_HOST, DB_FORCE } = process.env;

const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
    port: 3306,
    logging: false,
});

// modelos de la base de datos
const Role = RoleModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize, Role);
const State = StateModel(sequelize, Sequelize);
const Payment = PaymentModel(sequelize, Sequelize);
const Product = ProductModel(sequelize, Sequelize);
const Order = OrderModel(sequelize, Sequelize, State, Payment, User);
const OrderProduct = OrderProductModel(sequelize, Sequelize, Order, Product);

// Sincronización de la base de datos
sequelize
    .sync({ force: DB_FORCE })
    .then(() => {
        console.log('Base de datos cargada');
    })
    .catch((err) => {
        console.log(err);
    });

module.exports = {
    sequelize,
    Sequelize,
    User,
    Role,
    State,
    Payment,
    Product,
    Order,
    OrderProduct,
};
