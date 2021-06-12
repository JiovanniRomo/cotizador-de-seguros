class UI {

    llenarOpciones() {
        const max = new Date().getFullYear();
        const min = max - 20;

        const year = document.querySelector('#year');

        for (let i = max; i > min; i--) {
            let option = document.createElement('option');
            option.value = i;
            option.textContent = i;

            year.appendChild(option);
        }
    }

    mostrarError(mensaje, tipo) {
        this.mensaje = mensaje;
        this.tipo = tipo;

        const divError = document.createElement('div');
        if (tipo === 'error') {
            divError.classList.add('error');
        } else {
            divError.classList.add('correcto');
        }

        divError.classList.add('mensaje', 'mt-10');

        divError.textContent = mensaje;

        const formulario = document.querySelector('#cotizar-seguro');
        formulario.insertBefore(divError, document.querySelector('#resultado'));

        setTimeout(() => {
            divError.remove();
        }, 3000);
    }

    mostrarResultado(seguro, total) {
        const { marca, year, tipo } = seguro;

        let textoMarca;

        switch (marca) {

            case '1':
                textoMarca = 'Americano';
                break;

            case '2':
                textoMarca = 'Asiatico';
                break;

            case '3':
                textoMarca = 'Europeo';
                break;
            default:
                break;
        }

        const divResult = document.createElement('div');
        divResult.classList.add('mt-10');

        divResult.innerHTML = `
            <p class="header">Tu resumen</p>
            <p class="font-bold">Total <span class="fotn-normal">${textoMarca}</span></p>
            <p class="font-bold">Total <span class="fotn-normal">${year}</span></p>
            <p class="font-bold">Total <span class="fotn-normal capitalize">${tipo}</span></p>
            <p class="font-bold">Total <span class="fotn-normal">$ ${total}</span></p>
        `;

        const resultado = document.querySelector('#resultado');
        resultado.appendChild(divResult);
    }

}
const ui = new UI();


class Seguro {
    constructor(marca, year, tipo) {
        this.marca = marca;
        this.year = year;
        this.tipo = tipo;
    }

    calcularSeguro() {

        let cantidad;
        const base = 2000;
        switch (this.marca) {

            case '1':
                cantidad = base * 1.15;
                break;

            case '2':
                cantidad = base * 1.05;
                break;

            case '3':
                cantidad = base * 1.35;
                break;

            default:
                break;
        }

        if (this.tipo === 'basico') {
            cantidad *= 1.30;
        } else {
            cantidad *= 1.50;
        }

        console.log(cantidad)
        return cantidad;
    }
}

cargarListeners();
function cargarListeners() {

    document.addEventListener("DOMContentLoaded", () => {
        ui.llenarOpciones();
    })

    const formulario = document.querySelector('#cotizar-seguro');

    formulario.addEventListener('submit', cotizarSeguroSubmit);

}

function cotizarSeguroSubmit(e) {
    e.preventDefault();

    const marca = document.querySelector('#marca').value;

    const year = document.querySelector('#year').value;

    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    if (marca === '' || year === '' || tipo === '') {
        ui.mostrarError('Completa todos los campos', 'error');
        return;
    } else {
        const seguro = new Seguro(marca, year, tipo,);
        const total = seguro.calcularSeguro();

        ui.mostrarResultado(seguro, total);
    }

}