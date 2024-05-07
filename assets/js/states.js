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

                // Una vez cargados los municipios, llamar a cargarFechasYHoras
                cargarFechasYHoras();
            })
            .catch(error => console.error('Error al obtener los datos:', error));
    }
}


function cargarFechasYHoras() {
    const estadoSelect = document.getElementById("estado");
    const municipioSelect = document.getElementById("municipio");
    const estadoSeleccionado = estadoSelect.value;
    const municipioSeleccionado = municipioSelect.value;

    // Obtener las fechas y horas correspondientes al estado y municipio seleccionados
    fetch('assets/JSON/data.json')
        .then(response => response.json())
        .then(data => {
            const estadoData = data[estadoSeleccionado]; // Acceder a los datos de Aguascalientes
            if (estadoData) {
                const municipioData = estadoData.find(mun => mun.nombre === municipioSeleccionado);
                if (municipioData) {
                    const coordenadas = municipioData.coordenadas.split(','); // Separar las coordenadas
                    const latitud = parseFloat(coordenadas[0]); // Convertir la latitud a número

                    // Verificar si la latitud está fuera de la zona intertropical
                    if (latitud > 23.4380) {
                        // Mostrar mensaje de advertencia
                        const lugarEvento = document.querySelector('.place__event');
                        lugarEvento.innerHTML = `
                                <div class="sc__aviso">
                                    <span class="msg__aviso">Aviso</span>
                                    <span class="dato__event__aviso">Este fenómeno no puede ser observado en esta área debido a que el municipio está fuera de la zona intertropical.</span>
                                </div>
                            `;
                        return; // Detener la ejecución de la función
                    }

                    // Si la latitud está dentro de la zona intertropical, continuar con la carga de fechas y horas
                    const fecha1 = municipioData.fechas.Fecha1;
                    const fecha2 = municipioData.fechas.Fecha2;
                    const hora1 = municipioData.horas.Hora1;
                    const hora2 = municipioData.horas.Hora2;

                    // Obtener el nombre del estado
                    fetch('assets/JSON/mp.json')
                        .then(response => response.json())
                        .then(estados => {
                            const estadoNombre = estados.find(est => est.clave === estadoSeleccionado).nombre;

                            // Mostrar las fechas y horas en la página con el nombre del estado
                            const lugarEvento = document.querySelector('.place__event');
                            lugarEvento.innerHTML = `
                                    <div class="sc__localidad">
                                        <span class="title__localidad">Latitud y Longitud</span>
                                        <span class="dato__event">${coordenadas}</span>
                                    </div>                            
                                    <div class="sc__localidad">
                                        <span class="title__localidad">Estado</span>
                                        <span class="dato__event">${estadoNombre}</span>
                                    </div>
                                    <div class="sc__localidad">
                                        <span class="title__localidad">Municipio</span>
                                        <span class="dato__event">${municipioSeleccionado}</span>
                                    </div>
                                    <div class="sc__localidad">
                                        <span class="title__localidad">Fecha y Hora</span>
                                        <span class="dato__event">${fecha1} - ${hora1} hrs</span>
                                    </div>
                                    <div class="sc__localidad">
                                        <span class="title__localidad">Fecha y Hora</span>
                                        <span class="dato__event">${fecha2} - ${hora2} hrs</span>
                                    </div>
                                `;
                        })
                        .catch(error => console.error('Error al obtener los datos de los estados:', error));
                } else {
                    // Si no se encuentra el estado seleccionado, mostrar un aviso
                    const lugarEvento = document.querySelector('.place__event');
                    lugarEvento.innerHTML = `
                        <div class="sc__aviso">
                            <span class="msg__aviso">Oh no! x_x</span>
                            <span class="dato__event__aviso">Datos no encontrados para este Estado</span>
                        </div>
                    `;

                }
            } else {
                // Si no se encuentra el municipio seleccionado, mostrar un aviso
                const lugarEvento = document.querySelector('.place__event');
                lugarEvento.innerHTML = `
                        <div class="sc__aviso">
                            <span class="msg__aviso">Oh no! x_x</span>
                            <span class="dato__event__aviso">Datos no encontrados para este Municipio</span>
                        </div>
                    `;
            }
        })
        .catch(error => console.error('Error al obtener los datos de fechas y horas:', error));
}