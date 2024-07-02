document.addEventListener('DOMContentLoaded', () => {
    const productos = [
        { id: 1, nombre: 'MacetaRedonda', precio: 3000, categoria: 'macetas', imagen: '/assets/MacetaRedonda.jpg' },
        { id: 2, nombre: 'Maceta3D', precio: 4500, categoria: 'macetas', imagen: '/assets/Maceta3D.jpg' },
        { id: 3, nombre: 'PulseraPlanetas', precio: 6500, categoria: 'pulseras', imagen: '/assets/PulseraPlaneta.jpg' },
        { id: 4, nombre: 'PulseraTriple', precio: 5500, categoria: 'pulseras', imagen: '/assets/PulseraTriple.jpg' },
        { id: 5, nombre: 'ScrunchieVintage', precio: 2500, categoria: 'scrunchies', imagen: '/assets/ScrunchieVintage.jpg' },
        { id: 6, nombre: 'ScrunchieLila', precio: 1500, categoria: 'scrunchies', imagen: '/assets/ScrunchieLila.jpg' },
    ];

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const galeria = document.getElementById('galeria');
    const carritoContenedor = document.getElementById('carrito-contenedor');
    const totalCarrito = document.getElementById('total-carrito');
    const botonesCategoria = document.querySelectorAll('.botones button');
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

    const mostrarProductos = (categoria) => {
        galeria.innerHTML = '';
        const productosFiltrados = productos.filter(producto => producto.categoria === categoria);

        productosFiltrados.forEach(producto => {
            const div = document.createElement('div');
            div.classList.add('item');
            div.innerHTML = `
                <img src="${producto.imagen}">
                <h3>${producto.nombre}</h3>
                <p>Precio: $${producto.precio}</p>
                <button data-id="${producto.id}">Agregar al carrito</button>
            `;
            galeria.appendChild(div);
        });
    };

    const mostrarCarrito = () => {
        carritoContenedor.innerHTML = '';
        carrito.forEach(producto => {
            const div = document.createElement('div');
            div.classList.add('item');
            div.innerHTML = `
                <img src="${producto.imagen}">
                <h3>${producto.nombre}</h3>
                <p>Precio: $${producto.precio}</p>
                <button data-id="${producto.id}">Eliminar</button>
            `;
            carritoContenedor.appendChild(div);
        });
        totalCarrito.textContent = carrito.reduce((acc, producto) => acc + producto.precio, 0);
    };

    const agregarProducto = (id) => {
        const producto = productos.find(producto => producto.id === id);
        carrito.push(producto);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito();
    };

    const eliminarProducto = (id) => {
        carrito = carrito.filter(producto => producto.id !== id);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito();
    };

    botonesCategoria.forEach(boton => {
        boton.addEventListener('click', (e) => {
            mostrarProductos(e.target.id);
        });
    });

    galeria.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            agregarProducto(Number(e.target.dataset.id));
        }
    });

    carritoContenedor.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            eliminarProducto(Number(e.target.dataset.id));
        }
    });

    vaciarCarritoBtn.addEventListener('click', () => {
        carrito = [];
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito();
    });

    mostrarCarrito(); // Mostrar carrito al cargar la página
});

/* let productos = [
    {id: 1, nombre:'MacetaRedonda', precio: 3000},
    {id: 2, nombre:'Maceta3D', precio: 4500},
    {id: 3, nombre:'PulseraPlanetas', precio: 6500},
    {id: 4, nombre:'PulseraTriple', precio: 5500},
    {id: 5, nombre:'ScrunchieVintage', precio: 2500},
    {id: 6, nombre:'ScrunchieLila', precio: 1500},
];

let carrito = {
    productos: [],

    agregarProducto: function(producto) {
        this.productos.push(producto);
        alert(`${producto.nombre}" ha sido agregado al carrito`);
    },

    revoverProducto: function(id) {
        let productoIndex = this.productos.findIndex(producto => producto.id === id);
        if (productoIndex !== -1) {
            let productoEliminado = this.productos.splice(productoIndex, 1)[0];
            alert(`${productoEliminado.nombre}" ha sido eliminado del carrito`);
        } else {
            alert(`Producto con ID ${id}" no encontrado en el carrito`);
        }
    },

    mostrarProductos: function() {
        alert('Productos en el carrito: ');
        this.productos.forEach(producto => {
            alert(`- ${producto.nombre}: $${producto.precio}`);
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
    productos.forEach(producto => {
        alert(`ID: ${producto.id} - ${producto.nombre} - Precio: $${producto.precio}"`);    
    });

    while (true) {
        let idSeleccionado = parseInt(prompt('Ingrese el ID del producto que desea agregar al carrito (o ingrese 0 para terminar):'));

        if(idSeleccionado === 0) {
            break;
        }

        let productoSeleccionado = productos.find(producto => producto.id === idSeleccionado);

        if (productoSeleccionado) {
            carrito.agregarProducto(productoSeleccionado);
        } else {
            alert('ID de producto no válido. Por favor, ingrese un ID válido.');
        }
    }

    let totalCarrito = carrito.calcularTotal();
    alert(`El total de su compra es: $${totalCarrito}`)
}

seleccionarProducto();


 */