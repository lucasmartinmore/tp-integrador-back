
//Importaciones//

import express from "express";
import enviroments from "./src/api/config/enviroments.js";
import connection from "./src/api/database/db.js";
import cors from "cors";

import { loggerUrl } from "./src/api/middlewares/middlewares.js";

//carpeta config
const app = express();
const PORT = enviroments.port;


//Middlewares////////
app.use(cors()); //permite todas las solicitudes

app.use(express.json()); //Parsear el Json de solicitudes POST y PUT

app.use(loggerUrl);


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

//GET produc by id
app.get("/api/products/:id", async (req, res) => {
    const {id} = req.params;
    try{
        let sql = `SELECT * FROM productos where id_producto = ?`;
        const [ rows ] = await connection.query(sql, [id]);

        if( rows.length === 0 ) {
            return res.status(404).json({
                error: `No se encontro producto con id ${id}`
            })
        }

        res.status(200).json({
            payload: rows
        });
    }
    catch (error) {
        console.error(`Error obteniendo producto con id ${id}`, error.message);

        res.status(500).json({
            error: `Error interno al obtener un producto por id`
        });
    }
});


//Inicializar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})