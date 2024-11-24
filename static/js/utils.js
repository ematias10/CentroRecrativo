export const formatearPrecio = (precio) => {
    const precioFormateado = precio.toLocaleString('es-ES');

    return `$${precioFormateado}`
}