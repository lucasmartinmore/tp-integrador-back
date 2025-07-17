// Este archivo define las rutas para las vistas HTML/EJS de mi aplicación.
// Utiliza el Router para asociar URLs específicas (como '/', '/consultar')
// con las funciones de controlador de vistas (`view.controller.js`) encargadas
// de renderizar las plantillas EJS correspondientes. Es la parte del enrutamiento
// que maneja lo que el usuario ve en el navegador.

import { Router } from "express";
import { vistaConsultar, vistaCrear, vistaEliminar, vistaIndex, vistaModificar } from "../controllers/view.controller.js";

const router = Router();

///////////////////////////////////////////////////////
//               Ruta de las vistas EJS              //
//             Ruta para la página de inicio         //
///////////////////////////////////////////////////////
router.get("/", vistaIndex);

///////////////////////////////////////////////////////
// Ruta para la página de consulta de producto por ID//
///////////////////////////////////////////////////////
router.get("/consultar", vistaConsultar);

//////////////////////////////////////////////////////
//    Ruta para la página de creación de producto   //
//////////////////////////////////////////////////////
router.get("/crear", vistaCrear);

/////////////////////////////////////////////////////
// Ruta para la página de modificación de producto //
/////////////////////////////////////////////////////
router.get("/modificar", vistaModificar);

/////////////////////////////////////////////////////
//  Ruta para la página de eliminación de producto //
/////////////////////////////////////////////////////
router.get("/eliminar", vistaEliminar);

// Exporto las rutas de las vistas para que puedan ser utilizadas en el archivo principal (index.js)
export default router;
