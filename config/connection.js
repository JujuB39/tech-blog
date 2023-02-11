const { Sequelize } = require('sequelize');
require('dotenv').config();
console.log(process.env)
let sequelize
console.log(process.env.DB_PASSWORD)
if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD)
} else {
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: 'localhost',
            dialect: 'mysql',
            port: 3306
        }
    )
}

module.exports = sequelize;