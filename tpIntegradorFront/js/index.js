 const url = "http://localhost:3000/api";

            async function obtenerDatosProductos() {
                try {

                    // Esperamos la respuesta (en JSON) de la peticion fetch
                    let respuesta = await fetch(`${url}/products`);

                    // Transformamos la respuesta a objetos JS
                    let datos = await respuesta.json();

                    console.log(datos);
                    console.table(datos.payload);

                    mostrarProductos(datos);

                } catch(error) {
                    console.error("Error:", error);
                }
            }

            function mostrarProductos(array) {
                let listaProductos = array.payload; // Aca guardamos directamente el array de productos

                let productos_lista = document.getElementById("productos-lista");
                let htmlProducto = "";

                listaProductos.forEach(producto => {
                    htmlProducto += `
                        <li class="li-listados productos-listados">
                            <img src="${producto.image}" alt="${producto.name}" class="img-listados">
                            <p>Id: ${producto.id} / Nombre: ${producto.name} / <strong>Precio: ${producto.price}$</strong></p>
                        </li>
                    `;
                });

                productos_lista.innerHTML = htmlProducto;

            }

            obtenerDatosProductos();