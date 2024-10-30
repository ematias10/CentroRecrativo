
const obtenerDatosUsuario = async () => {
    const [ini, fin] = getData();

    try {
        let url = `/api/v1/servicios-disponibles/?fecha_inicio=${ini}&fecha_fin=${fin}`
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(`Response status: ${response.status}`)
        }
        const json = await response.json();
        console.log(json)
        agregarCab(json, 'disponibles');
    } catch (error) {
        console.error(error.message);
    }

};

const agregarCab = (json, div_id) => {
    const div = document.getElementById(div_id);
    div.innerHTML = '';

    json.forEach(element => {
        let subdiv = document.createElement('div')
        subdiv.textContent = element.nombre
        div.appendChild(subdiv)
    });

}

const getData = () => {
    let fechas = document.getElementById("fechas").value;

    let fecha = fechas.split(' ').join('');
    console.log(fecha);

    let newArray = fecha.split('to');

    console.log(newArray);
    return newArray;
}

const button = (document.getElementById("confirmar"))

let array = button.addEventListener('click',obtenerDatosUsuario);

