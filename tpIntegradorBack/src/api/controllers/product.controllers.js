import productModels from "../models/product.models.js";

//Traer todos los productos
export const getAllProducts = async (req, res) => { //La ruta solo tiene que llamar al controllador que es el que maneja la logica de peticiones y respuestas
    try{
        const [rows] = await productModels.selectAllProducts();

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
}

//Traer los productos por Id
export const getProductById = async (req, res) => {
    const {id} = req.params;
    try{
        const [rows] = await productModels.selectProdoductById(id);

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
}