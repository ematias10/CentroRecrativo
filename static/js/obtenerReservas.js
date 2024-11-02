
import { agregarAlCarrito, obtenerCarrito, eliminarDelCarrito  } from "./carrito.js";

const obtenerDatosUsuario = async () => {
    const [ini, fin] = getData();

    try {
        let url = `/api/v1/servicios-disponibles/?fecha_inicio=${ini}&fecha_fin=${fin}`
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(`Response status: ${response.status}`)
        }
        const json = await response.json();
        console.log(json);
        agregarCab(json, 'disponibles',ini,fin);
    } catch (error) {
        console.error(error.message);
    }
};

const agregarCab = (json, div_id, inicio, fin) => {
    const div = document.getElementById(div_id);
    div.innerHTML = '';

    json.forEach(element => {
        let subdiv = document.createElement('div')
        
        const array_element = Object.values(element);
        console.log(array_element);

        array_element.forEach(valor => {
            let p = document.createElement('p');
            p.textContent = valor;
            subdiv.appendChild(p);
            
        });
        let p = document.createElement('p')
        p.textContent = element.nombre
        subdiv.appendChild(p)

        let add = document.createElement('button');
        add.textContent = "Agregar";

        add.onclick = (()=>{
            agregarAlCarrito(element.id, inicio, fin, 3);
            mostrarCarrito();
            
        })

        subdiv.appendChild(add)


        div.appendChild(subdiv)

        
    });
    mostrarCarrito();
}

const getData = () => {
    let fechas = document.getElementById("fechas").value;

    let fecha = fechas.split(' ').join('');
    console.log(fecha);

    let newArray = fecha.split('to');

    console.log(newArray);
    return newArray;
}

const obtenerServicio = async (id) => {
    try {
        let url = `/api/v1/servicios/${id}`
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(`Response status: ${response.status}`)
        }
        const json = await response.json();
        return json;

    } catch (error) {
        console.error(error.message);
    }
}

const mostrarCarrito = async() => {
    const div_carrito = document.getElementById('listado_reservas');
    div_carrito.innerHTML = "";
    div_carrito.style.backgroundColor = 'red';
    div_carrito.style.color = 'white';
    const carrito_json = await obtenerCarrito();
    console.log(carrito_json);

    Object.entries(carrito_json).forEach( async ([clave, reserva]) => {
        const servicio = await obtenerServicio(clave);
        console.log(servicio)
        const div_reserva = document.createElement("div");

        const div_servicio = document.createElement("div");
        // recorrer valores del servicio reservado
        Object.entries(servicio).forEach(([k, v]) => {
            const valor = document.createElement("p")
            valor.textContent = v;
            console.log(v);

            div_servicio.appendChild(valor);
        })

        const div_detalles = document.createElement("div");
        //recorrer los valores del carrito
        Object.entries(reserva).forEach(([k, v]) => {
            const valor = document.createElement("p")
            valor.textContent = `${v}: ${k}`;
            console.log(v);

            div_detalles.appendChild(valor);
        })

        div_reserva.appendChild(div_servicio);
        div_reserva.appendChild(div_detalles);

        const eliminar = document.createElement('button');
        eliminar.textContent = 'eliminar'
        eliminar.onclick = async()=>{
            await eliminarDelCarrito(clave);
            mostrarCarrito();
        }
        div_reserva.style.border = '3px solid black';
        div_reserva.appendChild(eliminar)
        div_carrito.appendChild(div_reserva);

    });



}

const button = (document.getElementById("confirmar"));

let array = button.addEventListener('click',obtenerDatosUsuario);


