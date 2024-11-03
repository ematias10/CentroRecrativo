
import { agregarAlCarrito, obtenerCarrito, eliminarDelCarrito, mostrarCarrito  } from "./carrito.js";

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





const button = (document.getElementById("confirmar"));

let array = button.addEventListener('click',obtenerDatosUsuario);


