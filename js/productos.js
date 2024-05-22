// Contenedor de productos

function contenedorProductos(done){
    const results = fetch('https://fakestoreapi.com/products');
    results.then(res=>res.json()).then(data=> {done(data)});
}
const editarProducto=()=>{
    alert("No implementado")
}
const deleteProducto=()=>{
    alert("No implementado")
}
contenedorProductos((data)=>{
    let ContenedorProd =document.getElementById('productosContenedor')
    ContenedorProd.innerHTML=` 
    `
    data.forEach(producto => {

        
        let titulo = producto.title.length > 40 ? producto.title.substring(0, 40) + '...' : producto.title;

        ContenedorProd.innerHTML +=`
        <div class="contenedorProd"> 
        <img src=${producto.image} alt="imgProductos">
        <p>Nombre del producto:</p>


        <p>${titulo}</p>
        <p>Categoria:</p>
        <p>${producto.category}</p>
        <button  onClick="editarProducto()" style="color:green;background-color:transparent;border:none;padding:0;cursor:pointer;padding-right:10px"><i class="fa-solid fa-pen"></i></button>
        <button  onClick="deleteProducto()" style="color:rgb(242, 93, 93);background-color:transparent;border:none;padding:0;cursor:pointer;"><i class="fa-solid fa-trash-can " ></i></button>
        </div>
        `
    });
   
})

document.getElementById('img').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.getElementById('imagePreview');
            img.src = e.target.result;
            img.style.display = 'block'; // Mostrar la imagen
        }
        reader.readAsDataURL(file);
    }
});

const boton_agregar = document.querySelector('.boton_agregar');
const boton_quitar = document.querySelector('.boton_quitar');
const formLinks_prod = document.querySelector('.formulario');
const formLinks_prod_1 = document.querySelector('.formulario');

boton_agregar.addEventListener('click', () => {
    formLinks_prod.classList.toggle('activar_form'); // Alternar la clase 'active' en el contenedor de enlaces
});
boton_quitar.addEventListener('click', () => {
    formLinks_prod_1.classList.toggle('activar_form'); // Alternar la clase 'active' en el contenedor de enlaces
});

document.getElementById('customFileButton').addEventListener('click', function() {
    document.getElementById('img').click();
});

document.getElementById('img').addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('imagePreview').src = e.target.result;
            document.getElementById('imagePreview').style.display = 'block';
        }
        reader.readAsDataURL(file);
    }
});


/*-------------------------------------------------*/
function validacion() {
    // Obtener los valores de los campos de entrada
    var nombre = document.getElementById("nombre").value;
    var cantidad = document.getElementById("cantidad").value;
    var precio = document.getElementById("precio").value;
    var seleccion_prod = document.getElementById("producto").selectedIndex;
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

     //Validar la cantidad de productos
     if (cantidad == null || cantidad.length == 0) {
        document.getElementById("mensaje-cantidad").innerHTML = "⚠️ El campo cantidad es obligatorio";
        hayError = true;
    }


    // Validar el precio
    if (precio == null || precio.length == 0) {
        document.getElementById("mensaje-precio").innerHTML = "⚠️ El campo precio es obligatorio";
        hayError = true;
    }

    //Validar seleccion de productod
    if(seleccion_prod == null || seleccion_prod == 0){
        document.getElementById("mensaje-seleccion-prod").innerHTML = "⚠️ Tenes que seleccionar alguna opcion";
        hayError = true;
    }

    //Validar seleccion de proveedor
    if(seleccion_prov == null || seleccion_prov == 0){
        document.getElementById("mensaje-seleccion-prov").innerHTML = "⚠️ Tenes que seleccionar alguna opcion";
        hayError = true;
    }

    // Devolver false si hay algún error para evitar el envío del formulario
    return !hayError;
}
