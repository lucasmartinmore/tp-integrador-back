const url = "http://localhost:3000/api";
let altaProducts_form = document.getElementById("altaProducts-form");

altaProducts_form.addEventListener("submit", async (event) => {

    event.preventDefault(); // Evitamos el envio por defecto del formulario

    let formData = new FormData(event.target); // Obtenemos la data del formulario

    let data = Object.fromEntries(formData.entries()); // Convertimos a objeto JS nuestro objeto formulario
    console.log(data); // {category: 'food', image: 'imagen empanada', name: 'empanada', price: '60'}

    // Validamos datos previamente en el cliente
    if (!data.name || !data.image || !data.price) {
        alert("Todos los campos son obligatorios!");
        return;
    }

    try {
        let response = await fetch(`${url}/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            console.log(response);

            let result = await response.json();
            console.log(result.message);
            alert(result.message);

        } else {
            let error = await response.json();
            console.log("Error:", error.message);
        }

    } catch {
        console.log("Error al enviar los datos", error);
        alert("Error al enviar la solicitud");
    }

})