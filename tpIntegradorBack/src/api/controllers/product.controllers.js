// Importando modelos
import Products from "../models/product.models.js";


// Get all products
export const getAllProducts = async (req, res) => {

    try { // Optimizacion 1, manejo de errores con try/catch

        /* LOGICA EXPORTADA AL MODELO
        let sql = `SELECT * FROM products`;
    
        // Al usar [rows] la desestructuracion extrae directamente las filas, que es el primer resultado de la consulta, esto hace el codigo mas legible y explicito
        let [rows] = await connection.query(sql); */

        const rows = await Products.selectAllProducts();
        
        // Optimizacion 2, responder con exito, aunque no existiera ningun producto
        res.status(200).json({
            payload: rows,
            message: rows.length === 0 ? "No se encontraron productos" : "Productos encontrados"
        });

    } catch (error) {
        console.error("Error obteniendo productos", error);

        res.status(500).json({
            error: "Error interno del servidor al obtener productos"
        })
    }    
}



// Get product by id
export const getProductById = async (req, res) => {
    try {
        // let id = req.params.id
        let { id } = req.params;

        /* LOGICA EXPORTADA AL MODELO
        // let sql = `SELECT * FROM products where id = ${id}`; // Consulta no optimizada porque permite inyeccion SQL
        let sql  = `SELECT * FROM products where id = ?`;

        let [rows] = await connection.query(sql, [id]); */

        const [rows] = await Products.selectProductFromId(id);

        // Verificamos si se encontro el producto
        if(rows.length === 0) {
            return res.status(404).json({
                error: `No se encontro el producto con id: ${id}`
            });
        }

        res.status(200).json({
            payload: rows
        })

    } catch(error) {
        console.error(`Error obteniendo producto con id ${id}`, error.message);

        res.status(500).json({
            error: "Error interno al obtener un producto por id"
        });
    }
}


// Create new product
export const createProduct = async (req, res) => {

    try {

        // Recogemos y guardamos en variables los valores que recibimos del cliente
        let { category, image, name, price } = req.body;


        if(!category || !image || !name || !price) {
            return res.status(400).json({
                message: "Datos invalidos. Asegurate de enviar categoria, imagen, nombre y precio"
            });
        }

        /* LOGICA EXPORTADA AL MODELO
        // Proteccion contra SQL injection, usamos placeholders ?
        let sql = `INSERT INTO products (category, image, name, price) VALUES (?, ?, ?, ?)`;

        let [rows] = await connection.query(sql, [category, image, name, price]); */

        const [rows] = await Products.insertNewProduct(category, image, name, price);

        // Devolvemos informacion util del insert para devolver el ID del producto creado
        res.status(201).json({
            message: "Producto creado con exito",
            productId: rows.insertId
        });


    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        });
    }
}


// Modify product
export const modifyProduct = async (req, res) => {
    try {
        let { id, category, image, name, price } = req.body;

        // Validacion basica para comprobar que estan todos los campos
        if(!id || !category || !image || !name || !price) {
            return res.status(400).json({
                message: "Faltan campos requeridos"
            });
        }

        /* LOGICA EXPORTADA A MODELO
        let sql = `
            UPDATE products
            SET name = ?, image = ?, price = ?, category = ?
            WHERE id = ?
        `;

        let [result] = await connection.query(sql, [name, image, price, category, id]);*/

        const [result] = await Products.updateProduct(id, category, image, name, price);

        res.status(200).json({
            message: "Producto actualizado correctamente"
        });

    } catch (error) {
        console.error("Error al actualizar el producto", error);

        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        });
    }
}



// Remove product
export const removeProduct = async (req, res) =>{
    try {
        let { id } = req.params;

        if(!id) {
            return res.status(400).json({
                message: "Se requiere un id para eliminar un producto"
            })
        }

        /* LOGICA EXPORTADA AL MODELO
        let sql = `DELETE FROM products WHERE id = ?`;

        let [result] = await connection.query(sql, [id]); */

        const [result] = await Products.deleteProduct(id);

        if(result.affectedRows === 0) {
            return res.status(404).json({
                message: `No se encontro un producto con id ${id}`
            });
        }

        return res.status(200).json({
            message: `Producto con id ${id} eliminado correctamente`
        });

    } catch (error) {
        console.error("Error en DELETE /products/:id", error);

        res.status(500).json({
            message: `Error al eliminar producto con id ${id}`, error,
            error: error.message
        });
    }
}