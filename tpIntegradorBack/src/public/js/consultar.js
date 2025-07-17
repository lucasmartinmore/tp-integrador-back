// public/js/consultar.js

const url = "http://localhost:3000/api";
let getProduct_form; // Declaramos aquí, asignamos dentro de DOMContentLoaded
let getId_lista; // Declaramos aquí, asignamos dentro de DOMContentLoaded

// Asegura que el DOM está completamente cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {
    getProduct_form = document.getElementById("getProduct-form");
    getId_lista = document.getElementById("getId-list");

    // CRÍTICO: Verificar si los elementos existen antes de añadir listeners
    if (!getProduct_form) {
        console.error("Error: Elemento 'getProduct-form' no encontrado. Asegúrate que tu HTML tiene este ID y que el script se carga después del formulario.");
        return; // Detiene la ejecución si el formulario no existe
    }
    if (!getId_lista) {
        console.error("Error: Elemento 'getId-list' no encontrado. Asegúrate que tu HTML tiene este ID.");
        return; // Detiene la ejecución si el elemento de la lista no existe
    }

    getProduct_form.addEventListener("submit", async (event) => {
        event.preventDefault();

        try {
            getId_lista.innerHTML = "<p>Cargando producto...</p>";

            let formData = new FormData(event.target);
            let data = Object.fromEntries(formData.entries());
            let idProd = data.idProd.trim();

            if (!idProd) {
                throw new Error(`El ID del producto no puede estar vacío.`);
            }

            let response = await fetch(`${url}/products/${idProd}`);
            let datos = await response.json(); // Siempre intenta parsear JSON

            console.log("Datos recibidos de la API:", datos);

            // Verificar si la respuesta de la API es un error 404
            // Nota: Si el servidor devuelve un 404, response.ok será false.
            // Si el servidor envía un JSON de error (como tu controlador hace si no encuentra producto),
            // datos.payload será undefined o null.
            if (!response.ok || !datos.payload || datos.payload.length === 0) {
                // Si response.ok es false, ya hubo un error HTTP (ej. 404 del servidor)
                // O si datos.payload no existe o está vacío, significa que no se encontró el producto.
                getId_lista.innerHTML = `<p style="color: orange;">Producto con ID ${idProd} no encontrado.</p>`;
                console.warn(`Producto con ID ${idProd} no encontrado en la base de datos o error en la respuesta.`);
                return; // Detenemos la ejecución aquí
            }

            // Si llegamos aquí, significa que response.ok es true y datos.payload tiene al menos un producto.
            let producto = datos.payload[0]; // Accedemos al primer objeto del array 'payload'
            console.log("Objeto producto encontrado:", producto);

            // Verificación adicional: asegurarse de que el producto sea un objeto válido
            if (!producto || typeof producto !== 'object') {
                throw new Error("Formato de datos de producto inesperado de la API.");
            }

            // Asegurarse de que 'imagen_producto' sea una string válida para el 'src' del <img>
            // Si es null, undefined, o vacío, usa un placeholder.
            // Asegúrate que '/img/placeholder.png' exista en tu carpeta public/img/
            const imageUrl = producto.imagen_producto && producto.imagen_producto !== '' ? producto.imagen_producto : '/img/placeholder.png';
            const imageAlt = producto.nombre_producto || 'Producto';

            let htmlProducto = `
                <li id="producto-encontrado" class="li-listados productos-listados">
                    <img src="${imageUrl}" alt="${imageAlt}" class="img-listados">
                    <p>Id: ${producto.id_producto} / Nombre: ${producto.nombre_producto} / <strong>Precio: ${producto.precio_producto}$</strong></p>
                </li>
            `;

            getId_lista.innerHTML = htmlProducto;

        } catch (error) {
            console.error("Error al obtener el producto: ", error);
            getId_lista.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
        }
    });
});