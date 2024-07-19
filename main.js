document.addEventListener('DOMContentLoaded', () => {
    let productos = [];
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Referencias a elementos del DOM
    const galeria = document.getElementById('galeria');
    const carritoContenedor = document.getElementById('carrito-contenedor');
    const totalCarrito = document.getElementById('total-carrito');
    const botonesCategoria = document.querySelectorAll('.botones button');
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

    // Cargar productos desde el archivo JSON
    if (galeria) {
        fetch('./productos.json')
            .then(response => response.json())
            .then(data => {
                productos = data;
                mostrarProductos('macetas'); // Mostrar productos de la primera categoría por defecto
            })
            .catch(() => {
                Swal.fire({
                    title: 'Error',
                    text: 'No se pudo cargar la información de los productos.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            });
    }
    
    // Mostrar productos por categoría
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


    // Mostrar productos en el carrito
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

    // Agregar producto al carrito
    const agregarProducto = (id) => {
        const producto = productos.find(producto => producto.id === id);
        carrito.push(producto);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito();
        Toastify({
            text: "Producto agregado al carrito",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#28a745",
        }).showToast();
    };

    // Eliminar producto del carrito
    const eliminarProducto = (id) => {
        carrito = carrito.filter(producto => producto.id !== id);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito();
        Toastify({
            text: "Producto eliminado del carrito",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#dc3545",
        }).showToast();
    };

    // Vaciar el carrito
    if (vaciarCarritoBtn) {
        vaciarCarritoBtn.addEventListener('click', () => {
            carrito = [];
            localStorage.setItem('carrito', JSON.stringify(carrito));
            mostrarCarrito();
            Swal.fire({
                title: 'Carrito vaciado',
                text: 'Todos los productos han sido eliminados del carrito.',
                icon: 'info',
                confirmButtonText: 'Aceptar'
            });
        });
    }


    // Event listeners para botones de categoría
    if (botonesCategoria.length) {
        botonesCategoria.forEach(boton => {
            boton.addEventListener('click', (e) => {
                mostrarProductos(e.target.id);
            });
        });
    }

    // Event listener para agregar productos al carrito
    if (galeria) {
        galeria.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                agregarProducto(Number(e.target.dataset.id));
            }
        });
    }

    // Event listener para eliminar productos del carrito
    if (carritoContenedor) {
        carritoContenedor.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                eliminarProducto(Number(e.target.dataset.id));
            }
        });
    }


    // Mostrar carrito al cargar la página
    if (carritoContenedor) {
        mostrarCarrito();
    }
});


