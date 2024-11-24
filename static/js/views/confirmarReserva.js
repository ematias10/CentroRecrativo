import { agregarAlCarrito, obtenerCarrito, eliminarDelCarrito, mostrarCarrito  } from "../carrito.js";
import {formatearPrecio} from "../utils.js"
import { formatoRutInput, validarRut, limpiarRut } from "../rut.js";

formatoRutInput('rut');


const carrito_json = await obtenerCarrito();

console.log(carrito_json)

const tabla = document.createElement('table')

const encabezado = document.createElement('tr')

const encabezados = ['Cabañas','Fecha inicio','Fecha salida','Total dias','Precio', 'Total']

encabezados.forEach(cabeza => {
    const th = document.createElement('th');
    th.textContent = cabeza;

    encabezado.appendChild(th)
    
});

tabla.appendChild(encabezado)

Object.entries(carrito_json).forEach(([k,v]) => {
    const row = document.createElement('tr');
    const datos = [k,'fecha_inicio','fecha_fin','dias', 'precio', 'precio_total_dias']

    datos.forEach(valor => {
        const td = document.createElement('td')
        if(valor == 'precio' || valor == 'precio_total_dias'){
            td.textContent = formatearPrecio(v[valor]);
        } else{
            td.textContent = v[valor];
        }
        

        row.appendChild(td);
    });
    tabla.appendChild(row);
});

const tabla_container = document.getElementById('tabla-container')
tabla_container.appendChild(tabla)




const agregar_formulario = (json) => {
    const form = document.createElement('form')
    console.log(json)

    const input_name = document.createElement('input')
    input_name.value = json['nombres']
    input_name.disabled = true;

    const input_apellido = document.createElement('input')
    input_apellido.value = json['apellidos']
    input_apellido.disabled = true;

    const input_telefono = document.createElement('input')
    input_telefono.maxLength = 8;

    const input_correo = document.createElement('input')
    input_correo.type = 'email'

    const submit_btn = document.createElement('input')
    submit_btn.type = 'submit'

    form.appendChild(input_name)
    form.appendChild(input_apellido)
    form.appendChild(input_telefono)
    form.appendChild(input_correo)
    form.appendChild(submit_btn)
    document.body.appendChild(form)


}

const agregar_formulario2 = (json) => {
    const input_rut = document.getElementById('rut2');
    const input_nombres = document.getElementById('nombres');
    const input_apellidos = document.getElementById('apellidos');
    const input_telefono = document.getElementById('telefono');
    const input_correo = document.getElementById('correo');

    if (json.encontrado == true){
        input_rut.value = json.data['rut'];

        input_nombres.value = json.data['nombres'];
        input_nombres.disabled = true;

        input_apellidos.value = json.data['apellidos'];
        input_apellidos.disabled = true;


    }
    const formContainer = document.getElementById('formContainer');


    formContainer.classList.add('expanded');
}

const mostrar_datos = async(rut) => {
    try {
        let url = `/api/v1/clientes/${rut}`
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(`Response status: ${response.status}`)
        }
        const json = await response.json();
        console.log(json);
        agregar_formulario2(json);
    
    } catch (error) {
        console.error(error.message);
    }
}

const btn_buscar = document.getElementById("buscar")


btn_buscar.addEventListener("click",()=>{
    const rutInput = document.getElementById('rut').value;
    const result = document.getElementById('result');

    if (validarRut(rutInput)) {
        result.style.visibility = 'visible';
        result.textContent = 'RUT válido ✅';
        result.style.color = 'green';
        const rut = limpiarRut(rutInput)
        mostrar_datos(rut);
      } else {
        result.style.visibility = 'visible';
        result.textContent = 'RUT inválido ❌';
        result.style.color = 'red';
      }
    
})


