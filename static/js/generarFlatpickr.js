
export const crearDateRange = (id) => {
    flatpickr(`#${id}`, {
        locale: "es", // Configura el idioma en español
        dateFormat: "Y-m-d", // Configura el formato para el input (YYYY-MM-DD)
        mode: "range", // Habilita la selección de rango de fechas
        minDate: "today", // La fecha mínima es hoy
        maxDate: new Date().fp_incr(365), // Un año a partir de hoy como fecha máxima

        weekStart: 1, // Inicia la semana en lunes
        onChange: function(selectedDates, dateStr, instance) {
            // Formatear la salida como "YYYY-MM-DD to YYYY-MM-DD"
            if (selectedDates.length === 2) {
                const startDate = flatpickr.formatDate(selectedDates[0], "Y-m-d");
                const endDate = flatpickr.formatDate(selectedDates[1], "Y-m-d");
                instance.input.value = `${startDate} to ${endDate}`;
            }
        }
    });
}

export const getDatesFromDatepicker = () => {
    let fechas = document.getElementById("fechas").value;

    let fecha = fechas.split(' ').join('');
    console.log(fecha);

    let newArray = fecha.split('to');

    console.log(newArray);
    return newArray;
}