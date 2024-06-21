const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize("splitwise", "postgres", "myPass12", {
    host: "database-1.c7qceqigsnn2.eu-north-1.rds.amazonaws.com",
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, // For self-signed certificates
        },
    },
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = { sequelize, connectDB };
