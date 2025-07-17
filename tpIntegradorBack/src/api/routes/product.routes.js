// Este archivo define las rutas específicas para las operaciones CRUD 
// Utiliza el Router de Express para organizar
// las diferentes rutas HTTP (GET, POST, PUT, DELETE) y las asocia con las funciones de controlador
// (`product.controllers.js`) y middlewares (`middlewares.js`) correspondientes.

import { Router } from "express";
import { validateId } from "../middlewares/middlewares.js";
import { createProduct, getAllProducts, getProductById, modifyProduct, removeProduct } from "../controllers/product.controllers.js";


const router = Router();


///////////////////
// GET products //
/////////////////
// Ruta para obtener todos los productos
router.get("/", getAllProducts);


////////////////////////
// GET product by id //
//////////////////////

// Ruta para obtener un producto por su ID
// Utiliza el middleware 'validateId' para asegurar que el ID sea válido antes de llamar al controlador
router.get("/:id", validateId, getProductById);


//////////////////////////
// POST Insert product //
////////////////////////

// Ruta para crear un nuevo producto
router.post("/", createProduct);


//////////////////////////
// PUT Update products //
////////////////////////

// Ruta para actualizar un producto existente
router.put("/", modifyProduct);


////////////////////////////
// DELETE Delete product //
//////////////////////////

// Ruta para eliminar un producto por su ID
router.delete("/:id", removeProduct);


// Exportamos el router para que pueda ser utilizado en el archivo principal de rutas (index.js)
export default router;