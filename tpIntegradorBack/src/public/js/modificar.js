const url = "http://localhost:3000/api";

////////////////
// GET BY ID //
let getProduct_form = document.getElementById("getProduct-form");
let getId_lista = document.getElementById("getId-list");
let updateForm_container = document.getElementById("updateForm-container");

getProduct_form.addEventListener("submit", async (event) => {

    event.preventDefault(); // Evitamos el envio por defecto del formulario

    try {

        ///////////////////
        // Optimizacion 1: Mostrar el estado de carga
        getId_lista.innerHTML = "<p>Cargando usuario...</p>";


        // Queremos extraer la informacion de los campos del formulario!
        // Este es un objeto JavaScript especifico de informacion de formularios HTML
        let formData = new FormData(event.target);

        // Transformamos el objeto FormData en un objeto JS normal
        let data = Object.fromEntries(formData.entries());
        console.log(data);

        // Ahora que obtenemos el objeto con el campo de idProd, vamos a guardarlo en una variable


        ///////////////////
        // Optimizacion 2: Eliminamos posibles espacios con .trim()
        let idProd = data.idProd.trim();
        console.log(idProd);


        ///////////////////
        // Optimizacion 3: Validacion basica
        if (!idProd) {
            throw new Error(`Error en el envio de datos del formulario`);
        }

        let response = await fetch(`${url}/products/${idProd}`);

        ///////////////////
        // Optimizacion 4: Manejamos el error en una posible respuesta no existosa
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`); // Error 404: Not Found
        }


        let datos = await response.json();
        console.log(datos);


        ///////////////////
        // Optimizacion 5: Verificamos si existen productos en la respuesta
        if (!datos.payload || datos.payload.length === 0) {
            throw new Error("No se encontro el producto solicitado")
        }



        // Guardamos nuestro producto en una variable
        let producto = datos.payload[0];
        console.log(producto); // {"id": 2, "name": "hamburguesa salmon", "image": "https://burgernj.com/wp-content/uploads/2021/05/Salmon-Burger_.jpg", "category": "food", "price": "2500.00", "active": }


        // Le agregamos el boton que permita actualizar este producto encontrado
        let htmlProducto = `
                    <li class="li-listados productos-listados">
                        <div class="li-listados_datos">
                            <p>Id: ${producto.id} / Nombre: ${producto.name} / <strong>Precio: $${producto.price}</strong></p>
                            <img src="${producto.image}" alt="${producto.nombre}" class="img-listados">
                        </div>
                        <div class="li-listados_boton">
                            <input class="listados_boton" id="updateProduct_button" type="button" value="Actualizar producto">
                        </div>
                    </li>
                `;

        getId_lista.innerHTML = htmlProducto;

        let updateProduct_button = document.getElementById("updateProduct_button");

        updateProduct_button.addEventListener("click", function (event) {
            formularioPutProducto(event, producto);
        });


    } catch (error) {
        console.error("Error al obtener el producto: ", error);

        ///////////////////
        // Optimizacion 6: Escribir un mensaje de error
        getId_lista.innerHTML = `<p>${error.message}</p>`
    }
});



//////////
// PUT //

// Manejamos ele evneto para mostrar el formulario con los valores por defecto
function formularioPutProducto(event, producto) {
    event.stopPropagation(); // Evitamos la propagacion de eventos
    console.log(producto);

    let updateProduct = `
            <div id="updateProducts-container" class="crudForm-container">
                <h2>Actualizar producto</h2>

                <form id="updateProducts-form" autocomplete="off">

                    <label for="idProd">Id</label>
                    <input type="number" name="id" id="idProd" value=${producto.id} readonly>

                    <label for="categoryProd">Categoria</label>
                    <select name="category" id="categoryProd" required>
                        <option value="food">food</option>
                        <option value="drink">drink</option>
                    </select>

                    <label for="imagenProd">Imagen</label>
                    <input type="text" name="image" id="imagenProd" value=${producto.image} required>

                    <label for="nombreUser">Nombre</label>
                    <input type="text" name="name" id="nombreUser" value=${producto.name} required>

                    <label for="precioProd">Precio</label>
                    <input type="number" name="price" id="precioProd" value=${producto.price} required>

                    <input type="submit" value="Actualizar producto">
                </form>
            </div>
            `;

    updateForm_container.innerHTML = updateProduct;


    let updateProducts_form = document.getElementById("updateProducts-form");

    updateProducts_form.addEventListener("submit", function (event) {
        actualizarProducto(event);
    });
}


// Enviamos los nuevos datos del formulario al servidor
async function actualizarProducto(event) {

    event.preventDefault(); // Prevenimos el envio por defecto del formulario

    let formData = new FormData(event.target);

    let data = Object.fromEntries(formData.entries());
    console.table(data);

    if (!data.name || !data.image || !data.price) {
        alert("Todos los campos son obligatorios");
        return;
    }


    try {
        let response = await fetch(`${url}/products`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            console.log(response);

            let result = await response.json();
            console.log(result.message);
            alert(result.message);

            // Vaciamos si existiera la lista y el formulario de actualizacion del producto
            getId_lista.innerHTML = "";
            updateForm_container.innerHTML = "";

        } else {
            let error = await response.json();
            console.log("Error", error.message)
        }

    } catch (error) {
        console.log("Error al enviar los datos", error);
        alert("Error al procesar la solicitud");
    }
}