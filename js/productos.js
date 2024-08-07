// Contenedor de productos
function contenedorProductos(done) {
    const results = fetch('/views/productos');
    results.then(res => res.json()).then(data => { done(data)}
   
);
}

const editarproductos = (id) => {
    let updatecategoria = document.getElementById('editarproductos');
    updatecategoria.innerHTML = `
        <form id="formEditarProducto" method="POST">
         <h2 class="titulo-pedido">Actualizar Producto</h2>
        
                <label for="imagen">imagen:</label>
                <input type="text" name="imagen" id="imagen" placeholder="Ingrese uri de la imagen">
                <label id="mensaje-img"></label>
        
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" placeholder="Ingrese nombre del producto">
                <label id="mensaje-nombre"></label>
        
                <label for="cantidad">Cantidad:</label>
                <input type="number" id="cantidad" name="cantidad" min="1" placeholder="Ingrese la cantidad">
                <label id="mensaje-cantidad"></label>
        
                <label for="precio">Precio:</label>
                <input type="number" name="precio" id="precio" placeholder="Ingrese el precio">
                <label id="mensaje-precio"></label>
        
                <label for="proveedor">Seleccione el Proveedor del producto:</label>
                <select id="proveedor" name="proveedor">
                    <option>Seleccione una opcion:</option>
                    <option value="Nike">Nike</option>
                    <option value="Puma">Puma</option>
                    <option value="Kingston">Kingston</option>
                    <option value="Polo">Polo</option>
                </select>
                <label id="mensaje-seleccion-prov"></label>
        
                <label for="producto">Seleccione categoria del producto:</label>
                <select id="categoria" name="categoria">
                    <option>Seleccione una opcion:</option>
                    <option value="Ropa">Ropa</option>
                    <option value="Joyeria">Joyeria</option>
                    <option value="Tecnologia">Tecnologia</option>
                    <option value="Otro">Otro</option>
                </select>
                <label id="mensaje-seleccion-prod"></label>
                <input id="submit_prod" name="submit_prod" type="submit" value="Actualizar">
        </form>
    `;

    // Agregar evento de envío al formulario
    const formEditarProducto = document.getElementById('formEditarProducto');
    formEditarProducto.onsubmit = (e) => {
        e.preventDefault(); // Prevenir el envío por defecto del formulario


        // Recopilar los datos del formulario
        const formData = new FormData(formEditarProducto);
        const data = new URLSearchParams(formData);

        fetch(`/editarproductos/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', // URL encoding
            },
            body: data,
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al actualizar la categoría');
            }
            return response.json();
        })
        .then(data => {
            if (data.redirect) {
                window.location.href = data.redirect; // Redirigir a la URL proporcionada
            } else {
                console.error('Error en la actualización:', data.message);
            }
        })
        .catch(error => {
            console.error('Error al actualizar la categoría:', error);
        });
    };
};
const deleteProducto = (id) => {
    fetch(`/eliminar/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.redirect) {
            console.log('Redirigiendo a home:', data.redirect);
            window.location.href = data.redirect;  // Redirigir a la URL proporcionada
        } else {
            console.error('Error en la eliminación:', data.message);
        }
    })
    .catch(error => {
        console.error('Error al eliminar el producto:', error);
    });
}

contenedorProductos((data) => {
    let ContenedorProd = document.getElementById('productosContenedor');
    ContenedorProd.innerHTML = '';
    data.forEach(producto => {
        console.log(producto);
        let nombre = producto.nombre.length > 40 ? producto.nombre.substring(0, 40) + '...' : producto.nombre;
        console.log(producto.id);
        ContenedorProd.innerHTML += `
        <div class="contenedorProd" id="${producto.id}">
        <img src="${producto.imagen}" alt="imgProductos">
        <p>Nombre del producto: ${producto.nombre}</p>
        <p>Categoria: ${producto.categoria}</p>
        <p>Precio: ${producto.precio}</p>
        <p>Proveedor: ${producto.proveedor}</p>
        <p>cantidad: ${producto.cantidad}</p>
        <button onClick="editarproductos(${producto.id})" style="color:green;background-color:transparent;border:none;padding:0;cursor:pointer;padding-right:10px"><i class="fa-solid fa-pen"></i></button>
        <button onClick="deleteProducto(${producto.id})" style="color:rgb(242, 93, 93);background-color:transparent;border:none;padding:0;cursor:pointer;"><i class="fa-solid fa-trash-can"></i></button>
        </div>
        `;
    });
});

const boton_agregar = document.querySelector('.boton_agregar');
const boton_quitar = document.querySelector('.boton_quitar');
const formLinks_prod = document.querySelector('.formulario');

boton_agregar.addEventListener('click', () => {
    formLinks_prod.classList.toggle('activar_form'); // Alternar la clase 'active' en el contenedor de enlaces
});

boton_quitar.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation(); // Detener la propagación del evento click
    formLinks_prod.classList.toggle('activar_form'); // Alternar la clase 'activar_form' en el formulario
});

/*-------------------------------------------------*/
function validacion() {
    // Obtener los valores de los campos de entrada
    var nombre = document.getElementById("nombre").value;
    var cantidad = document.getElementById("cantidad").value;
    var precio = document.getElementById("precio").value;
    var seleccion_prod = document.getElementById("categoria").selectedIndex;
    var seleccion_prov = document.getElementById("proveedor").selectedIndex;

    // Inicializar una variable de estado para controlar si hay errores
    var hayError = false;

    // Limpiar mensajes de error anteriores
    document.getElementById("mensaje-nombre").innerHTML = "";
    document.getElementById("mensaje-cantidad").innerHTML = "";
    document.getElementById("mensaje-precio").innerHTML = "";
    document.getElementById("mensaje-seleccion-prod").innerHTML = "";
    document.getElementById("mensaje-seleccion-prov").innerHTML = "";

    // Validar el nombre
    if (nombre == null || nombre.length == 0) {
        document.getElementById("mensaje-nombre").innerHTML = "⚠️ El campo nombre es obligatorio";
        hayError = true;
    }

    // Validar la cantidad de productos
    if (cantidad == null || cantidad.length == 0) {
        document.getElementById("mensaje-cantidad").innerHTML = "⚠️ El campo cantidad es obligatorio";
        hayError = true;
    }

    // Validar el precio
    if (precio == null || precio.length == 0) {
        document.getElementById("mensaje-precio").innerHTML = "⚠️ El campo precio es obligatorio";
        hayError = true;
    }

    // Validar selección de producto
    if (seleccion_prod == null || seleccion_prod == 0) {
        document.getElementById("mensaje-seleccion-prod").innerHTML = "⚠️ Tenes que seleccionar alguna opcion";
        hayError = true;
    }

    // Validar selección de proveedor
    if (seleccion_prov == null || seleccion_prov == 0) {
        document.getElementById("mensaje-seleccion-prov").innerHTML = "⚠️ Tenes que seleccionar alguna opcion";
        hayError = true;
    }

    // Devolver false si hay algún error para evitar el envío del formulario
    return !hayError;
}