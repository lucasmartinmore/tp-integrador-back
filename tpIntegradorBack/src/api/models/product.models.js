import connection from "../database/db.js";

//Seleccionar todos los productos
const selectAllProducts = async () => {
    const sql = "SELECT * FROM productos";
    return await connection.query(sql);
}

//Seleccionar productos por Id
const selectProdoductById = async () => {
    let sql = `SELECT * FROM productos where id_producto = ?`;
    return await connection.query(sql, [id]);
}

export default { selectAllProducts, selectProdoductById }