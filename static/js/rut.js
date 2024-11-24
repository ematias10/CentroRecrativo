
export const formatoRutInput = (input_id) => {
    document.getElementById(input_id).addEventListener('input', function (e) {
        let rut = e.target.value.replace(/[^0-9kK]/g, ''); // Eliminar caracteres no válidos
        if (rut.length > 1) {
          const cuerpo = rut.slice(0, -1); // Dígitos principales del RUT
          const dv = rut.slice(-1); // Dígito verificador
          // Formatear cuerpo con puntos
          const cuerpoFormateado = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
          // Concatenar cuerpo formateado con el dígito verificador
          e.target.value = `${cuerpoFormateado}-${dv}`;
        }
    });
}

// Función para validar el RUT
export const validarRut = (rut) => {
    // Eliminar puntos, guiones y transformar a minúsculas
    const cleanRut = rut.replace(/[.-]/g, '').toLowerCase();
  
    // Verificar que tenga al menos 2 caracteres (cuerpo y DV)
    if (cleanRut.length < 2) return false;
  
    // Dividir en cuerpo y dígito verificador
    const cuerpo = cleanRut.slice(0, -1);
    const dv = cleanRut.slice(-1);
  
    // Verificar que el cuerpo solo contenga números
    if (!/^\d+$/.test(cuerpo)) return false;
  
    // Calcular dígito verificador
    let suma = 0;
    let multiplo = 2;
  
    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += parseInt(cuerpo[i]) * multiplo;
      multiplo = multiplo === 7 ? 2 : multiplo + 1;
    }
  
    const dvCalculado = 11 - (suma % 11);
    const dvFinal = dvCalculado === 11 ? '0' : dvCalculado === 10 ? 'k' : dvCalculado.toString();
  
    // Comparar el dígito verificador calculado con el ingresado
    return dv === dvFinal;
  }

  export const limpiarRut = (rut) => {
    return rut.replace(/[.]/g, ''); // Eliminar puntos
  }