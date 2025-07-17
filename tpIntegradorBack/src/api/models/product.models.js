// Este archivo es la capa de "modelo" de mi aplicación, encargada de toda la interacción
// directa con la base de datos MySQL. Contiene funciones asíncronas para realizar
// operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en la tabla 'productos'.
// Recibe los datos ya mapeados desde los controladores,construye las consultas SQL y las ejecuta utilizando el pool de conexiones.

import connection from "../database/db.js";


//////////////////////////
// Select all products //
/////////////////////////
const selectAllProducts = async () => {
    let sql = `SELECT * FROM productos`;
    const [rows] = await connection.query(sql);
    return rows;
}


/////////////////////////////
// Select product from id //
///////////////////////////
const selectProductFromId = async (id) => {
    let sql = `SELECT * FROM productos WHERE id_producto = ?`;
    const [rows] = await connection.query(sql, [id]);
    return rows;
}


/////////////////////////
// Insert new product //
///////////////////////
const insertNewProduct = async (category, image, name, price) => {
    let sql = `INSERT INTO productos (tipo_producto, imagen_producto, nombre_producto, precio_producto, descripcion_producto, stock_producto, activo_producto) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const [result] = await connection.query(sql, [category, image, name, price, 'Sin descripción', 0, 1]);
    return result;
}


/////////////////////
// Update product //
///////////////////
const updateProduct = async (id, category, image, name, price) => {
    // Se actualizan las columnas de la tabla 'productos' según los datos recibidos.
    let sql = `
        UPDATE productos
        SET nombre_producto = ?, imagen_producto = ?, precio_producto = ?, tipo_producto = ?
        WHERE id_producto = ?
    `;
    const [result] = await connection.query(sql, [name, image, price, category, id]);
    return result;
}


/////////////////////
// Delete product //
///////////////////
const deleteProduct = async (id) => {
    let sql = `DELETE FROM productos WHERE id_producto = ?`;
    const [result] = await connection.query(sql, [id]);
    return result;
}

export default {
    selectAllProducts,
    selectProductFromId,
    insertNewProduct,
    updateProduct,
    deleteProduct
}
