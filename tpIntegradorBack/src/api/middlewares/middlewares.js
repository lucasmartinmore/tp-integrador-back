//Middlewares////////
const loggerUrl = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}]`)
    next();
}

//Middleware de ruta, para validar id
const valditeId = (req, res, next) => {
    const id = req.params.id;

    if(!id || isNaN(id))
    {
        return res.status(400).json({
            error: "El id debe ser un numero valido"
        })
    }
    //Parseamos el id a numero entero
    req.id = parseInt(id,10);
    next();
}

export { loggerUrl, valditeId }