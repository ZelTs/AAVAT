// Fetch para obtener el JSON de estados y municipios
fetch('assets/JSON/mp.json')
    .then(response => response.json())
    .then(data => {
        const estadoSelect = document.getElementById("estado");
        data.forEach(estado => {
            const option = document.createElement("option");
            option.value = estado.clave;
            option.textContent = estado.nombre;
            estadoSelect.appendChild(option);
        });

        // Llamar a cargarMunicipios una vez para cargar los municipios del primer estado
        cargarMunicipios();
    })
    .catch(error => console.error('Error al obtener los datos:', error));

function cargarMunicipios() {
    const estadoSelect = document.getElementById("estado");
    const municipioSelect = document.getElementById("municipio");
    const estadoSeleccionado = estadoSelect.value;

    // Limpiar la lista de municipios
    municipioSelect.innerHTML = '<option value="" disabled selected>Seleccione el municipio</option>';

    if (estadoSeleccionado === "") {
        // Si no se ha seleccionado un estado, deshabilitar la lista de municipios
        municipioSelect.disabled = true;
    } else {
        // Encontrar el estado seleccionado en el arreglo de estados
        fetch('assets/JSON/mp.json')
            .then(response => response.json())
            .then(data => {
                const estado = data.find(est => est.clave === estadoSeleccionado);

                // Llenar la lista de municipios con los municipios correspondientes al estado seleccionado
                estado.municipios.forEach(municipio => {
                    const option = document.createElement("option");
                    option.value = municipio;
                    option.textContent = municipio;
                    municipioSelect.appendChild(option);
                });

                // Habilitar la lista de municipios
                municipioSelect.disabled = false;

                // Seleccionar automáticamente el primer municipio de la lista
                if (estado.municipios.length > 0) {
                    municipioSelect.value = estado.municipios[0];
                }
            })
            .catch(error => console.error('Error al obtener los datos:', error));
    }
}
