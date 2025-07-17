// Este archivo es el responsable de manejar las solicitudes relacionadas con la renderización de las vistas
// de la aplicación. 

import Products from "../models/product.models.js";


// Get view for Products (Página de inicio con listado de productos)
export const vistaIndex = async (req, res) => {
    try {
        // Obtiene todos los productos del modelo. El modelo ya devuelve el array directamente.
        const respuestaProductos = await Products.selectAllProducts(); 

        // Renderiza la plantilla 'index.ejs' y le pasa el título y el array de productos.
        res.render("index", {
            title: "Listado de productos",
            products: respuestaProductos 
        });

    } catch (error) {
        console.error("Error obteniendo la información para la vista de productos", error.message);
        res.status(500).json({
            error: "Error interno al obtener la información para la vista"
        });
    }
}


// Get view for get by id (Página para consultar un producto por su ID)
export const vistaConsultar = (req, res) => {
    res.render("consultar", {
        title: "Consultar producto",
        about: "Consultar producto por id"
    });
}


// Get view for post (Página para crear un nuevo producto)
export const vistaCrear = (req, res) => {
    res.render("crear", {
        title: "Crear producto"
    });
}


// Get view for put (Página para modificar un producto existente)
export const vistaModificar = (req, res) => {
    res.render("modificar", {
        title: "Modificar producto",
        about: "Primero buscamos el id, luego generamos un formulario para actualizar los campos"
    });
}


// Get view for delete (Página para eliminar un producto)
export const vistaEliminar = (req, res) => {
    res.render("eliminar", {
        title: "Eliminar producto",
        about: "Primero buscamos el id, luego generamos un boton para eliminar y un prompt para confirmar"
    });
}
