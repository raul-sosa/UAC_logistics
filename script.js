function agregarPaquetes() {
    const numPaquetes = document.getElementById('numPaquetes').value;
    const detallesPaquetes = document.getElementById('detallesPaquetes');
    detallesPaquetes.innerHTML = '';

    if (numPaquetes > 2) {
        const sameDimensionsButton = document.createElement('button');
        sameDimensionsButton.type = 'button';
        sameDimensionsButton.className = 'btn btn-info mb-3';
        sameDimensionsButton.textContent = 'Tienen las mismas dimensiones y peso';
        sameDimensionsButton.onclick = () => {
            for (let i = 2; i <= numPaquetes; i++) {
                document.getElementById(`dimension${i}`).value = document.getElementById('dimension1').value;
                document.getElementById(`peso${i}`).value = document.getElementById('peso1').value;
            }
        };
        detallesPaquetes.appendChild(sameDimensionsButton);
    }

    for (let i = 1; i <= numPaquetes; i++) {
        detallesPaquetes.innerHTML += `
            <div class="form-group">
                <label for="dimension${i}">Dimensiones del Paquete ${i} (cm)</label>
                <input type="text" class="form-control" id="dimension${i}" required>
            </div>
            <div class="form-group">
                <label for="peso${i}">Peso del Paquete ${i} (kg)</label>
                <input type="text" class="form-control" id="peso${i}" required>
            </div>
        `;
    }
}

function siguientePaso(pasoActual) {
    if (validarFormulario(pasoActual)) {
        document.getElementById(`paso${pasoActual}`).style.display = 'none';
        document.getElementById(`paso${pasoActual + 1}`).style.display = 'block';
    }
}

function pasoAnterior(pasoActual) {
    document.getElementById(`paso${pasoActual}`).style.display = 'none';
    document.getElementById(`paso${pasoActual - 1}`).style.display = 'block';
}

function validarFormulario(paso) {
    let valid = true;
    const campos = document.querySelectorAll(`#paso${paso} input`);
    campos.forEach(campo => {
        if (!campo.checkValidity()) {
            valid = false;
            campo.classList.add('is-invalid');
        } else {
            campo.classList.remove('is-invalid');
        }
    });
    return valid;
}

document.getElementById('quoteForm').addEventListener('submit', function(event) {
    event.preventDefault();
    if (validarFormulario(3)) {
        let costoTotal = 0;
        const opciones = document.getElementsByName('opcionEnvio');
        for (let i = 0; i < opciones.length; i++) {
            if (opciones[i].checked) {
                const costo = parseInt(opciones[i].value.split('- $')[1]);
                const numPaquetes = document.getElementById('numPaquetes').value;
                costoTotal = costo * numPaquetes;
            }
        }
        alert(`El costo total sería: $${costoTotal}`);
        window.location.href = 'index.html';
    }
});
