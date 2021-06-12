class UI {

    mostrarError (mensaje, tipo) {
        this.mensaje = mensaje;
        this.tipo = tipo;

        const divError = document.createElement('div');
        if(tipo === 'error') {
            divError.classList.add('error');
        } else {
            divError.classList.add('correcto');
        }

        divError.classList.add('mensaje', 'mt-10');

        divError.textContent = mensaje;

        const formualrio =  document.querySelector('#cotizar-seguro');
        formualrio.insertBefore(divError, document.querySelector('#resultado'));

        setTimeout(() => {
            divError.remove();
        }, 3000);
    }

    llenarOpciones() {
        const max = new Date().getFullYear();
        const min = max - 20;

        const year = document.querySelector('#year');

        for(let i = max; i > min; i--) {
            let option = document.createElement('option');
            option.value = i;
            option.textContent = i;

            year.appendChild(option);
        }
    }
}
const ui = new UI();


class Seguro {
    constructor(marca, year, tipo) {
        this.marca = marca;
        this.year = year;
        this.tipo = tipo;
    }

    calcularSeguro () {
        
    }
}

cargarListeners();
function cargarListeners() {

    document.addEventListener("DOMContentLoaded", () => {
        ui.llenarOpciones();
    })

    const formualrio = document.querySelector('#cotizar-seguro');

    formualrio.addEventListener('submit', cotizarSeguroSubmit);

}

function cotizarSeguroSubmit(e) {
    e.preventDefault();

    const marca = document.querySelector('#marca').value;

    const year = document.querySelector('#year').value;

    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    
    if(marca === '' || year === '' || tipo === '') {
        ui.mostrarError('Completa todos los campos', 'error');
        return;
    } else {
        ui.mostrarError('Correcto', 'exitoso');
    }

}