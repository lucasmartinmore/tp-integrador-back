import { Router } from "express";
import { validateId } from "../middlewares/middlewares.js";
import { createProduct, getAllProducts, getProductById, modifyProduct, removeProduct } from "../controllers/product.controllers.js";


const router = Router();


///////////////////
// GET products //
router.get("/", getAllProducts);



////////////////////////
// GET product by id //
router.get("/:id", validateId, getProductById);



//////////////////////////
// POST Insert product //
router.post("/", createProduct);



//////////////////////////
// PUT Update products //
router.put("/", modifyProduct);



////////////////////////////
// DELETE Delete product //
router.delete("/:id", removeProduct);



// Exportamos las rutas de los productos
export default router;