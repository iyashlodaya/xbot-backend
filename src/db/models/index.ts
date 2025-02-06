import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Create Sequelize instance using environment variables
const sequelize = new Sequelize(
  {
    dialect: "postgres", // Database dialect
    database: process.env.POSTGRES_DB as string, // Database name
    username: process.env.POSTGRES_USER as string, // Database user
    password: process.env.POSTGRES_PASSWORD as string,
    host: process.env.POSTGRES_HOST as string, // Host
    port: parseInt(process.env.POSTGRES_DB_PORT as string, 10), // Port
    logging: false, // Disable query logging
  }
);

export default sequelize;