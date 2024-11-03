import { agregarAlCarrito, obtenerCarrito, eliminarDelCarrito, mostrarCarrito  } from "./carrito.js";

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
        td.textContent = v[valor]

        row.appendChild(td);
    });
    tabla.appendChild(row);
});

document.body.append(tabla)




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

const mostrar_datos = async() => {
    const rut = document.getElementById("rut").value
    if (rut != ""){
        try {
            let url = `/api/v1/clientes/${rut}`
            const response = await fetch(url);
            if(!response.ok){
                throw new Error(`Response status: ${response.status}`)
            }
            const json = await response.json();
            console.log(json);
            agregar_formulario(json)
    
        } catch (error) {
            console.error(error.message);
        }
        
    }


}

const btn_buscar = document.getElementById("buscar")


btn_buscar.addEventListener("click",()=>mostrar_datos())


