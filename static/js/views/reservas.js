import { agregarAlCarrito, obtenerCarrito, eliminarDelCarrito, mostrarCarrito  } from "../carrito.js";
import { crearDateRange, getDatesFromDatepicker } from "../generarFlatpickr.js";
import { formatearPrecio } from "../utils.js"


crearDateRange('fechas');

const obtenerServiciosPorFechas = async () => {
    const [inicio, fin] = getDatesFromDatepicker();

    try {
        let url = `/api/v1/servicios-disponibles/?fecha_inicio=${inicio}&fecha_fin=${fin}`;
        let spinner = document.getElementById('loading');
        spinner.hidden = false;
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(`Response status: ${response.status}`)
        }
        const json = await response.json();
        console.log(json);
        const div = document.getElementById('cards');
        div.innerHTML = '';
        setTimeout(() => {
 
            spinner.hidden = true;
            agregarServiciosDisponibles(json,div,inicio,fin);
        }, 500);
        
        

    } catch (error) {
        console.error(error.message);
    }
};

const BtnAgregarCarrito = (servicio, inicio, fin) =>{
    agregarAlCarrito(servicio.id, inicio, fin, 3);
}

export const agregarServiciosDisponibles = (json_servicios, div, inicio, fin) => {
    
    json_servicios.forEach(servicio => {
        const button_aceptar = document.createElement("button");
        button_aceptar.className = "btn btn-primary"
        button_aceptar.textContent = "Reservar"
        
        const button_agregar = document.createElement("button");
        button_agregar.className = "btn btn-secondary"
        button_agregar.textContent = "Agregar"
        button_agregar.onclick = ()=>{BtnAgregarCarrito(servicio,inicio,fin)}

        const div_card_button = document.createElement("div");
        div_card_button.append(button_agregar)
        div_card_button.append(button_aceptar)
  
        const card_data_title = document.createElement("a");
        card_data_title.textContent = `${servicio.nombre}`
        card_data_title.className += "card-data-title"

        const card_data_price = document.createElement("p");
        card_data_price.textContent = `${formatearPrecio(servicio.tipo_servicio.precio)}`
        card_data_price.className += "card-data-price"

        const card_data_price_span = document.createElement("span");
        card_data_price_span.textContent = " por noche"
        card_data_price.appendChild(card_data_price_span)

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

const button = (document.getElementById("confirmar"));
button.addEventListener('click',obtenerServiciosPorFechas);