import mysql from "mysql2/promise";
import enviroments from "../config/enviroments.js";

const { database } = enviroments;
const connection = mysql.createPool({
    host: database.host,
    database: database.database,
    user: database.user,
    password: database.password
});

export default connection;