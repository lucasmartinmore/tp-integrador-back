// Este archivo contiene funciones middleware que se pueden insertar en el ciclo
// de solicitud-respuesta de Express. 

// Middleware logger para analizar y logear todas las solicitudes
const loggerUrl = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next();
};

// Middleware de ruta donde validaremos el id
const validateId = (req, res, next) => {
    const id = req.params.id;

    // En caso de no existir id o de que este no sea un numero
    if(!id || isNaN(id)) {
        return res.status(400).json({
            error: "El ID debe ser un numero"
        });
    }

    // Convertimos el parametro id a un numero entero (integer) de base 10, decimal
    req.id = parseInt(id, 10);

    next();
}

export {
    loggerUrl,
    validateId
}