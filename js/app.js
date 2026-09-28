const resultado = document.getElementById('resultado');

document.getElementById('txtBtn').addEventListener('click', cargarTXT);
document.getElementById('jsonBtn').addEventListener('click', cargarJSON);
document.getElementById('apiBTN').addEventListener('click', cargarREST);

function prepararResultado(titulo) {
    resultado.innerHTML = `
        <h2 class="subtitulo">${titulo}</h2>
        <div class="grid"></div>
    `;
    return resultado.querySelector('.grid');
}

function mostrarError(mensaje) {
    resultado.innerHTML = `<p class="error">⚠️ ${mensaje}</p>`;
}

// ---------- TXT: una card por cada línea ----------
function cargarTXT(e) {
    e.preventDefault();
    resultado.innerHTML = '<p class="cargando">Cargando TXT...</p>';

    fetch('datos.txt')
        .then(function (res) {
            return res.text();
        })
        .then(function (texto) {
            const lineas = texto.split('\n').filter(function (linea) {
                return linea.trim() !== '';
            });

            const grid = prepararResultado('📄 Contenido del archivo TXT');
            lineas.forEach(function (linea, i) {
                grid.innerHTML += `
                    <div class="card card-txt">
                        <div class="circulo">${i + 1}</div>
                        <p>${linea}</p>
                    </div>
                `;
            });
        })
        .catch(function (error) {
            console.log(error);
            mostrarError('No se pudo cargar datos.txt');
        });
}

// ---------- JSON: una card por cada empleado ----------
function cargarJSON(e) {
    e.preventDefault();
    resultado.innerHTML = '<p class="cargando">Cargando JSON...</p>';

    fetch('empleados.json')
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            const grid = prepararResultado('🧾 Empleados (JSON)');
            data.forEach(function (empleado) {
                grid.innerHTML += `
                    <div class="card card-json">
                        <div class="circulo">${empleado.nombre.charAt(0)}</div>
                        <h3>${empleado.nombre}</h3>
                        <span class="etiqueta">${empleado.puesto}</span>
                    </div>
                `;
            });
        })
        .catch(function (error) {
            console.log(error);
            mostrarError('No se pudo cargar empleados.json');
        });
}

// ---------- API: cards con la foto ----------
function cargarREST(e) {
    e.preventDefault();
    resultado.innerHTML = '<p class="cargando">Cargando API...</p>';

    fetch('https://picsum.photos/v2/list?limit=12')
        .then(function (res) {
            return res.json();
        })
        .then(function (imagenes) {
            const grid = prepararResultado('🌐 Imágenes desde la API');
            imagenes.forEach(function (imagen) {
                grid.innerHTML += `
                    <div class="card card-api">
                        <img class="foto" src="https://picsum.photos/id/${imagen.id}/400/250" alt="Foto de ${imagen.author}">
                        <h3>${imagen.author}</h3>
                        <a class="ver" target="_blank" href="${imagen.url}">Ver imagen original</a>
                    </div>
                `;
            });
        })
        .catch(function (error) {
            console.log(error);
            mostrarError('No se pudo conectar con la API');
        });
}