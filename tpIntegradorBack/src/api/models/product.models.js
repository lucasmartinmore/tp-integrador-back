import connection from "../database/db.js";

//////////////////////////
// Select all products //
const selectAllProducts = async () => {
    let sql = `SELECT * FROM productos`; // OK, 'productos' es tu tabla
    const [rows] = await connection.query(sql); // Correcto: desestructura para obtener solo las filas
    return rows; // Retorna solo las filas, que es un array
}


/////////////////////////////
// Select product from id //
const selectProductFromId = async (id) => {
    // ¡CRÍTICO! Asegúrate de que el nombre de la tabla sea 'productos' y la columna sea 'id_producto'
    let sql = `SELECT * FROM productos WHERE id_producto = ?`; // <-- CORREGIDO A 'productos' e 'id_producto'
    const [rows] = await connection.query(sql, [id]); // Correcto: desestructura para obtener solo las filas
    return rows; // Retorna solo las filas (un array, vacío si no hay resultados)
}


/////////////////////////
// Insert new product //
const insertNewProduct = async (category, image, name, price) => {
    // Aquí debes asegurarte de que los campos en tu INSERT coincidan exactamente con tu tabla 'productos'.
    // Según tu estructura de DB, tienes:
    // id_producto, nombre_producto, descripcion_producto, precio_producto, imagen_producto, tipo_producto, stock_producto, activo_producto

    // La consulta INSERT debe reflejar TODAS las columnas que no son AUTO_INCREMENT y no tienen un DEFAULT.
    // O bien, puedes insertar solo las que pasas y el resto usar sus valores por defecto si los tienen.
    // Si tus campos son `category`, `image`, `name`, `price`, debes mapearlos a los de la DB.
    // Asumo: category -> tipo_producto, image -> imagen_producto, name -> nombre_producto, price -> precio_producto

    // Si `descripcion_producto`, `stock_producto`, `activo_producto` no son pasados,
    // debes darles valores por defecto aquí o pasarlos desde el controlador.
    // Por simplicidad, les asigno valores por defecto:
    let sql = `INSERT INTO productos (tipo_producto, imagen_producto, nombre_producto, precio_producto, descripcion_producto, stock_producto, activo_producto) VALUES (?, ?, ?, ?, ?, ?, ?)`; // Ajustado a tus columnas de DB
    
    // Asumo que 'category' es 'tipo_producto'
    // Asumo que 'image' es 'imagen_producto'
    // Asumo que 'name' es 'nombre_producto'
    // Asumo que 'price' es 'precio_producto'
    const [result] = await connection.query(sql, [category, image, name, price, 'Sin descripción', 0, 1]); // Valores por defecto para los campos no recibidos
    return result;
}


/////////////////////
// Update product //
const updateProduct = async (id, category, image, name, price) => {
    // Asegúrate de usar los nombres de columnas correctos de tu DB:
    // nombre_producto, imagen_producto, precio_producto, tipo_producto, id_producto
    let sql = `
        UPDATE productos
        SET nombre_producto = ?, imagen_producto = ?, precio_producto = ?, tipo_producto = ?
        WHERE id_producto = ?
    `; // <-- CORREGIDO a nombres de tu DB y tabla 'productos'

    // El orden de los parámetros DEBE coincidir con el orden en la sentencia SET
    const [result] = await connection.query(sql, [name, image, price, category, id]);
    return result;
}


/////////////////////
// Delete product //
const deleteProduct = async (id) => {
    // Asegúrate de usar la tabla 'productos' y la columna 'id_producto'
    let sql = `DELETE FROM productos WHERE id_producto = ?`; // <-- CORREGIDO
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