// Este archivo de utilidades proporciona funciones y variables para el manejo de rutas de archivos.
// Es crucial para determinar la ruta absoluta a la raíz de tu proyecto, lo que permite
// que la aplicación localice correctamente otros archivos (como vistas estáticas o plantillas EJS)

import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
// Calcula la ruta absoluta al directorio raíz del proyecto
// Se mueve tres niveles hacia arriba desde la ubicación actual del archivo
const __dirname = join(dirname(__filename), "../../../"); 

export {
    __dirname, 
    join       // Función para unir segmentos de rutas de manera segura y multiplataforma
}
