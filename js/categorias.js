fetch('/views/categoria')
.then((respuesta) => respuesta.json())
.then((data) => {
    contenedorCategoria(data);
    console.log(data);
});
const editarcategoria = (id) => {
    let updatecategoria = document.getElementById('updatecategoria');
    updatecategoria.innerHTML = `
        <form id="formEditarCategoria" method="POST">
            <p style="border: none; margin: 0; padding: 0;">
                <button type="button" class="boton_quitar"><i class="fa-solid fa-xmark"></i></button>
            </p>
            <h2 class="titulo-pedido">Editar Categoría</h2>

            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" placeholder="Ingrese nombre de Categoría" required>
            <label id="mensaje-categoria" style="color: red;"></label>

            <label for="proveedor">Seleccione proveedor de productos:</label>
            <select id="proveedor" name="proveedor" required>
                <option value="">Seleccione una opción:</option>
                <option value="Polo">Polo</option>
                <option value="Nike">Nike</option>
                <option value="Kingstong">Kingstong</option>
                <option value="Puma">Puma</option>
                <option value="Otro">Otro</option>
            </select>
            <label id="mensaje-seleccion-prov" style="color: red;"></label>

            <input id="submit" name="submit" type="submit" value="Actualizar">
        </form>
    `;

    // Agregar evento de envío al formulario
    const formEditarCategoria = document.getElementById('formEditarCategoria');
    formEditarCategoria.onsubmit = (e) => {
        e.preventDefault(); // Prevenir el envío por defecto del formulario


        // Recopilar los datos del formulario
        const formData = new FormData(formEditarCategoria);
        const data = new URLSearchParams(formData);

        fetch(`/editarcategoria/${id}`, {
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
const deletecategoria = (id) => {
    fetch(`/eliminarcategoria/${id}`, {
        
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.redirect) {
            window.location.href = data.redirect;  // Redirigir a la URL proporcionada
        } else {
            console.error('Error en la eliminación:', data.message);
        }
    })
    .catch(error => {
        console.error('Error al eliminar el producto:', error);
    });
}
const contenedorCategoria=(data)=>{
let contenedorCategoria =document.getElementById('categoriaContenedor')
contenedorCategoria.innerHTML=''
data.forEach(categoria => {
    contenedorCategoria.innerHTML +=` 
    <div id="${categoria.id}">
     <tr >
         <td>${categoria.nombre}</td>
         <td>${categoria.proveedor} </td>
         <td><button  onClick="editarcategoria(${categoria.id})" style="color:green;background-color:transparent;border:none;padding:0;cursor:pointer;padding-right:10px"><i class="fa-solid fa-pen"></i></button></td>
         <td><button  onClick="deletecategoria(${categoria.id})" style="color:rgb(242, 93, 93);background-color:transparent;border:none;padding:0;cursor:pointer;"><i class="fa-solid fa-trash-can " ></i></button></td>  
     </tr>  
     </div>
    ` 
});
}
   const boton_agregar = document.querySelector('.boton_agregar');
   const formLinks_categ = document.querySelector('.formulario');
   const boton_quitar = document.querySelector('.boton_quitar');
   boton_agregar.addEventListener('click', () => {
       formLinks_categ.classList.toggle('activar_form'); // Alternar la clase 'active' en el contenedor de enlaces
   });
   boton_quitar.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation(); // Detener la propagación del evento click
    formLinks_categ.classList.toggle('activar_form'); // Alternar la clase 'activar_form' en el formulario
});
   
function validacion() {
    // Obtener los valores de los campos de entrada y limpiar espacios
    var categoria = document.getElementById("nombre").value.trim();
    var seleccion_prov = document.getElementById("proveedor").value.trim();

    console.log("Nombre de Categoría:", categoria);
    console.log("Proveedor seleccionado:", seleccion_prov);

    // Inicializar una variable de estado para controlar si hay errores
    var hayError = false;

    // Limpiar mensajes de error anteriores
    document.getElementById("mensaje-categoria").innerHTML = "";
    document.getElementById("mensaje-seleccion-prov").innerHTML = "";

    // Validar el nombre de la categoría
    if (categoria === "") {
        document.getElementById("mensaje-categoria").innerHTML = "⚠️ El campo nombre es obligatorio";
        hayError = true;
    }

    // Validar selección del proveedor
    if (seleccion_prov === "") {
        document.getElementById("mensaje-seleccion-prov").innerHTML = "⚠️ Tienes que seleccionar alguna opción";
        hayError = true;
    }

    // Registro en consola para depuración
    console.log("Hay Error:", hayError);

    // Devolver false si hay algún error para evitar el envío del formulario
    return !hayError;
}
