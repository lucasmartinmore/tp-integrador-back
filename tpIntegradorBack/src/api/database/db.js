// Este archivo es responsable de establecer la conexión a la base de datos MySQL.
// Utiliza las credenciales de entorno cargadas desde 'environments.js' para crear
// un pool de conexiones. 

import mysql from "mysql2/promise";
import environments from "../config/enviroments.js"; 

const { database } = environments;

// Crea un pool de conexiones a la base de datos MySQL
const connection = mysql.createPool({
    host: database.host,
    database: database.name,
    user: database.user,
    password: database.password
});

// Exporta el pool de conexión para que otros módulos puedan usarlo
export default connection;