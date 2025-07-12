
//Importaciones//

import express from "express";
import enviroments from "./src/api/config/enviroments.js";
import connection from "./src/api/database/db.js";

//carpeta config
const app = express();
const PORT = enviroments.port;

//Rutas//////////
app.get("/api/products", async (req, res) => {
    try{
        const sql = "SELECT * FROM productos";
        const [ rows ] = await connection.query(sql);

        res.status(200).json({
            payload : rows,
            message: rows.length === 0 ? "No se encontraron productos" : "Se encontraron los productos"
        })

    } catch (error) {
        console.error("Error devolviendo los productos", error.message);

        res.status(200).json({
            Error: "Error interno al obtener los productos"
        })
    }
})

//Inicializar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})