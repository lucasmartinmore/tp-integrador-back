// src/api/utils/index.js
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(dirname(__filename), "../../../"); // ESTO ES CLAVE para la ruta a la raíz del proyecto

export {
    __dirname,
    join
}