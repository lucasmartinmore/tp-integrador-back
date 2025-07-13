//Middlewares////////
const loggerUrl = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}]`)
    next();
}

export { loggerUrl }