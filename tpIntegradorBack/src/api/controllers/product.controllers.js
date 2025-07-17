// Este archivo actúa como la capa de "controlador" para las operaciones de la API REST de productos.
// Su función es recibir las solicitudes HTTP del cliente, procesar los datos de entrada,
// llamar a las funciones adecuadas del modelo (que interactúan con la base de datos),
// y enviar una respuesta HTTP al cliente. También se encarga de la validación de datos
// y el manejo de errores a nivel de la API.

import Products from "../models/product.models.js";


// Get all products
export const getAllProducts = async (req, res) => {
    try {
        const rows = await Products.selectAllProducts();
        
        res.status(200).json({
            payload: rows,
            message: rows.length === 0 ? "No se encontraron productos" : "Productos encontrados"
        });

    } catch (error) {
        console.error("Error obteniendo productos", error);

        res.status(500).json({
            error: "Error interno del servidor al obtener productos"
        });
    }    
}


// Get product by id
export const getProductById = async (req, res) => {
    try {
        let { id } = req.params;

        const rows = await Products.selectProductFromId(id);

        if(rows.length === 0) {
            return res.status(404).json({
                error: `No se encontro el producto con id: ${id}`
            });
        }

        res.status(200).json({
            payload: rows
        });

    } catch(error) {
        // Me aseguro de que 'id' esté definido para el mensaje de error
        const productId = req.params.id || 'desconocido'; 
        console.error(`Error obteniendo producto con id ${productId}`, error.message);

        res.status(500).json({
            error: "Error interno al obtener un producto por id"
        });
    }
}


// Create new product
export const createProduct = async (req, res) => {
    try {
        // Recogemos los valores del frontend (nombres genéricos)
        let { category, image, name, price, description, stock } = req.body; 

        // Validar los campos requeridos 
        if(!category || !image || !name || !price || description === undefined || stock === undefined) {
            return res.status(400).json({
                message: "Datos invalidos. Asegurate de enviar categoria, imagen, nombre, precio, descripción y stock."
            });
        }
        // Pasamos los parámetros al modelo con los nombres y en el orden que el modelo espera para la DB
        const result = await Products.insertNewProduct(
            category,        // Mapea a tipo_producto
            image,           // Mapea a imagen_producto
            name,            // Mapea a nombre_producto
            price,           // Mapea a precio_producto
            description,     // Mapea a descripcion_producto
            stock            // Mapea a stock_producto
        );

        // Devolvemos informacion util del insert para devolver el ID del producto creado
        res.status(201).json({
            message: "Producto creado con exito",
            productId: result.insertId
        });

    } catch (error) {
        console.error("Error al crear producto", error);

        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        });
    }
}


// Modify product
export const modifyProduct = async (req, res) => {
    try {
        // Recogemos los valores del frontend (nombres genéricos)
        let { id, category, image, name, price, description, stock } = req.body; 

        // Validacion basica para comprobar que estan todos los campos
        // Validar los campos requeridos por la base de datos
        if(!id || !category || !image || !name || !price || description === undefined || stock === undefined) {
            return res.status(400).json({
                message: "Faltan campos requeridos. Asegúrate de enviar id, categoria, imagen, nombre, precio, descripción y stock."
            });
        }

        // CORRECCIÓN CLAVE: Mapeo de nombres del frontend a nombres de la base de datos
        // Pasamos los parámetros al modelo con los nombres y en el orden que el modelo espera para la DB
        const result = await Products.updateProduct(
            id,              // Mapea a id_producto
            category,        // Mapea a tipo_producto
            image,           // Mapea a imagen_producto
            name,            // Mapea a nombre_producto
            price,           // Mapea a precio_producto
            description,     // Mapea a descripcion_producto
            stock            // Mapea a stock_producto
        );

        // Verificamos si se afectó alguna fila (si el producto existía y se actualizó)
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: `No se encontró un producto con id ${id} para actualizar o no se realizaron cambios.`
            });
        }

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
export const removeProduct = async (req, res) => {
    try {
        let { id } = req.params;

        if(!id) {
            return res.status(400).json({
                message: "Se requiere un id para eliminar un producto"
            });
        }

        const result = await Products.deleteProduct(id);

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
            message: `Error al eliminar producto con id ${id}`, 
            error: error.message
        });
    }
}
