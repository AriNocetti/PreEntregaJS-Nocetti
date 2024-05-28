const precios = {
    maceta: 1400,
    scrunchie: 850,
    pulsera: 1150,
};

function obtenerCosto(producto) {
    if (precios[producto] !== undefined) {
        return precios[producto];
    } else {
        return 0;
    }
}

function seleccionarProductos() {
    let total = 0;
    let seleccion = "";
    let continuar = true;

    while (continuar) {
        seleccion = prompt("Seleccione un producto! o escriba salir");
        if (seleccion.toLowerCase() === "salir"){
            continuar = false;
        } else {
            let costo = obtenerCosto(seleccion.toLowerCase());
            if (costo > 0) {
                total += costo;
                alert ("Has seleccionado una " + seleccion + ". Costo: " + costo + ". Total actual: " + total);
            } else {
                alert("Producto no válido. Por favor, seleccione un producto disponible.");
            }
        }
    }
    return total;
}

function simuladorDeCompras() {
    alert("Bienvenido al simulador de compras!");
    let totalFinal = seleccionarProductos();
    alert("El costo total de su compra es: " + totalFinal + ". Gracias por tu compra!");
}

simuladorDeCompras();