import { Router } from "express";
import { getAllProducts, getProductById } from "../controllers/product.controllers.js";

const router = Router;

//Rutas//////////
router.get("/",getAllProducts)

//GET produc by id
router.get("/:id",getProductById);

export default router