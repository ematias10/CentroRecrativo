function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}



export const agregarAlCarrito = (servicio_id, fecha_inicio, fecha_fin, cantidad_personas) => {
    const csrftoken = getCookie('csrftoken');
    
    // const url = "/app/cart/agregar-al-carrito/";
    const BASE_URL = window.location.origin;
    const url = `${BASE_URL}/app/cart/agregar-al-carrito/`;
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({
            servicio_id: servicio_id,
            fecha_inicio: fecha_inicio,
            fecha_fin: fecha_fin,
            cantidad_personas: cantidad_personas
        })
    })
    .then(response => response.json())
    .then(data => {
        // alert(data.message);
    });

}


export const obtenerCarrito = async() => {
    const url = "/app/cart/ver-carrito/";
    const response = await fetch(url);

    if(!response.ok){
        throw new Error(`Response status: ${response.status}`)
    }
    const json = await response.json();
    return json;
    console.log(json);
}

export const eliminarDelCarrito = async(id) => {
    const url = `/app/cart/eliminar-del-carrito/${id}/`

    const response = await fetch(url);

    if(!response.ok){
        console.log("error")
        throw new Error(`Response status: ${response.status}`);
        
    }

    console.log("Eliminado del carrito");

}

export const mostrarCarrito = async() => {
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