// KET NOI DATABASE DEN PROJECT

const { Sequelize } = require("sequelize");

require("dotenv").config();
// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    // process.env.DB_PASSWORD
    // "jnr",
    // "root",
    null, {
        host: "localhost",
        dialect: "mysql",
        logging: false,
    }
);

const connectDB = async() => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

module.exports = connectDB;