// Este archivo es el encargado de cargar las variables de entorno de mi proyecto.
// Utiliza la librería 'dotenv' para leer el archivo '.env' (que no se sube a Git)
// y hacer que sus variables (como las credenciales de la base de datos y el puerto)
// estén disponibles en 'process.env'. 
import dotenv from "dotenv";

// Cargo las variables de entorno desde el archivo .env

dotenv.config(); 

export default {
    // Defino el puerto del servidor. Si process.env.PORT no está definido, usa 5000 por defecto.
    port: process.env.PORT || 5000, 
    // Configuración de la base de datos, obtenida de las variables de entorno
    database: {
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    }
}
