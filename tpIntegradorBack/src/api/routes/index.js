// Este archivo actúa como un "archivo de barril" para las rutas de mi aplicación.
// Su propósito es el de agrupar y re-exportar todas las definiciones de rutas
// (como las de la API de productos y las vistas) desde un único punto.

import productRoutes from "./product.routes.js";
import viewRoutes from "./view.routes.js";

// Exporta todas las rutas agrupadas
export {
    productRoutes,
    viewRoutes
}