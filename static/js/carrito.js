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

const csrftoken = getCookie('csrftoken');

const agregarAlCarrito = (servicio_id, fecha_inicio, fecha_fin, cantidad_personas) => {
    url = "/app/cart/agregar-al-carrito/";

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