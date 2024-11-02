function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


export const agregarAlCarrito = (servicio_id, fecha_inicio, fecha_fin, cantidad_personas) => {
    const csrftoken = getCookie('csrftoken');
    const url = "/app/cart/agregar-al-carrito/";

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
        alert(data.message);
    });

}

/**
 * This JavaScript function asynchronously fetches the contents of a shopping cart from a specified URL
 * and returns the JSON response.
 * @returns The function `obtenerCarrito` is returning a JSON object fetched from the specified URL
 * "/app/cart/ver-carrito/".
 */
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