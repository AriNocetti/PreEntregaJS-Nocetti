let prodcutos = [
    {id: 1, nombre:'MacetaRedonda', precio: 3000},
    {id: 2, nombre:'Maceta3D', precio: 4500},
    {id: 3, nombre:'PulseraPlanetas', precio: 6500},
    {id: 4, nombre:'PulseraTriple', precio: 5500},
    {id: 5, nombre:'ScrunchieVintage', precio: 2500},
    {id: 6, nombre:'ScrunchieLila', precio: 1500},
];

let carrito = {
    productos:[],

    agregarProducto: function(producto) {
        this.productos.push(producto);
        alert('${producto.nombre}" ha sido agregado al carrito');
    },

    revoverProducto: function(id) {
        let productoIndex = this.productos.findIndex(producto => producto.id === id);
        if (productoIndex !== -1) {
            let productoEliminado = this.productos.splice(productoIndex, 1)[0];
            alert('${productoEliminado.nombre}" ha sido eliminado del carrito');
        } else {
            alert('Producto con ID ${id}" no encontrado en el carrito');
        }
    },

    mostrar1productos: function() {
        alert('Productos en el carrito: ');
        this.productos.forEach(producto => {
            alert('- ${producto.nombre}: $${producto.precio}"');
        });
    },

    calcularTotal: function() {
        let total = 0;
        this.productos.forEach(producto => {
            total += producto.precio;
        });
        return total;
    }
};

function seleccionarProducto() {
    alert('Productos disponibles: ');
    prodcutos.forEach(producto => {
        alert('ID: ${producto.id} - ${producto.nombre} - Precio: $${producto.precio}"');    
    });

    while (true) {
        let idSeleccionado = parseInt(prompt('Ingrese el ID del producto que desea agregar al carrito (o ingrese 0 para terminar):'));

        if(idSeleccionado === 0){
            break;
        }

        let productoSeleccionado = producto.find(producto => producto.id === idSeleccionado);

        if (productoSeleccionado) {
            carrito.agregarProducto(productoSeleccionado);
        } else {
            alert('ID de producto no válido. Por favor, ingrese un ID válido.');
        }
    }
}



