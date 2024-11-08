
import { agregarAlCarrito, obtenerCarrito, eliminarDelCarrito, mostrarCarrito  } from "./carrito.js";
import { crearDateRange, getDatesFromDatepicker } from "./generarFlatpickr.js";


crearDateRange('fechas');

const funcionBtnAgregar = (servicio, inicio, fin) => {
    agregarAlCarrito(servicio.id, inicio, fin, 3);
    mostrarCarrito();
}

const obtenerPrecio = (servicio) => {
    const precio = servicio.tipo_servicio.precio;
    const precioFormateado = precio.toLocaleString('es-ES');

    return `$${precioFormateado}`
}

export const obtenerServiciosDisponibles = async() => {
    const [ini, fin] = getDatesFromDatepicker();
    try {
        let url = `/api/v1/servicios-disponibles/?fecha_inicio=${ini}&fecha_fin=${fin}`;
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(`Response status: ${response.status}`)
        }
        const json = await response.json();

    } catch (error) {
        
    }
}

export const agregarServiciosDisponibles = (json_servicios, div_id, inicio, fin) => {
    const div = document.getElementById(div_id);
    div.innerHTML = '';

    json_servicios.forEach(servicio => {
    

        
        const button_aceptar = document.createElement("button");
        button_aceptar.className = "btn btn-primary"
        button_aceptar.textContent = "Reservar"
        
        const button_agregar = document.createElement("button");
        button_agregar.className = "btn btn-secondary"
        button_agregar.textContent = "Agregar"
        button_agregar.onclick = ()=>{funcionBtnAgregar(servicio,inicio,fin)}

        const div_card_button = document.createElement("div");
        div_card_button.append(button_agregar)
        div_card_button.append(button_aceptar)
  
        const card_data_title = document.createElement("a");
        card_data_title.textContent = `${servicio.nombre}`
        card_data_title.className += "card-data-title"

        const card_data_price = document.createElement("p");
        card_data_price.textContent = `${obtenerPrecio(servicio)}`
        card_data_price.className += "card-data-price"

        const card_data_description = document.createElement("p");
        card_data_description.textContent = `${servicio.descripcion}`
        card_data_description.className += "card-data-description"
        
        const div_card_data = document.createElement("div");
        div_card_data.className += "card-data";
        div_card_data.appendChild(card_data_title);
        div_card_data.appendChild(card_data_price);
        div_card_data.appendChild(card_data_description);
        div_card_data.appendChild(div_card_button);

        const card_image = document.createElement("img");
        card_image.className = "card-img img-thumbnail"
        card_image.src = 'https://images.homify.com/image/upload/c_scale,h_375,w_500/v1438778991/p/photo/image/797995/Gartenhaus_Friedland.jpg' 

        const div_card_image = document.createElement("div");
        div_card_image.className += "card-image col-3"
        div_card_image.appendChild(card_image)

        const div_card_description = document.createElement("div");
        div_card_description.className += "card-description";
        div_card_description.appendChild(div_card_image);
        div_card_description.appendChild(div_card_data);

        const div_card = document.createElement("div");
        div_card.className += "card-container";
        div_card.appendChild(div_card_image);
        div_card.appendChild(div_card_description);

        div.appendChild(div_card);
    });

}





const obtenerDatosUsuario = async () => {
    const [ini, fin] = getDatesFromDatepicker();

    try {
        let url = `/api/v1/servicios-disponibles/?fecha_inicio=${ini}&fecha_fin=${fin}`
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(`Response status: ${response.status}`)
        }
        const json = await response.json();
        console.log(json);
        //agregarCab(json, 'disponibles',ini,fin);
        agregarServiciosDisponibles(json,'cards',ini,fin)
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


