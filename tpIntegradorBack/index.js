// index.js
import express from "express";
import environments from "./src/api/config/enviroments.js";
import cors from "cors";
import { productRoutes, viewRoutes } from "./src/api/routes/index.js";
import { loggerUrl } from "./src/api/middlewares/middlewares.js";
import { __dirname, join } from "./src/api/utils/index.js"; // IMPORTANTE: Importa de utils/index.js

const app = express();
const PORT = environments.port;

// Configuramos EJS como motor de plantillas
app.set("view engine", "ejs");

// Le indicamos a la aplicacion desde que ruta va a servir vistas desde raizProyecto/src/api/view
app.set("views", join(__dirname, "src/api/view")); // __dirname es la raíz del proyecto, esto es CORRECTO.

// Middleware para servir archivos estaticos
app.use(express.static(join(__dirname, "src/public")));  // __dirname es la raíz del proyecto, esto es CORRECTO.

//////////////////
// Middlewares //
app.use(express.json()); 
app.use(cors()); 
app.use(loggerUrl);

////////////
// Rutas //
app.use("/api/products", productRoutes);
app.use("/dashboard", viewRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})