const editarProveedor=()=>{
    alert("No implementado")
   }
   const deleteProveedor=()=>{
       alert("No implementado")
   }
   fetch('../json/proveedores.json')
       .then((respuesta) => respuesta.json())
       .then((data) => {
           contenedorProveedores(data);
   });
   const contenedorProveedores=(data)=>{
       let contenedorProveedores =document.getElementById('proveedoresContenedor')
       contenedorProveedores.innerHTML=''
       data.forEach(proveedor => {
           contenedorProveedores.innerHTML +=` 
           <tr>
               <td>${proveedor.proveedorName}</td>
               <td>${proveedor.numero} </td>
               <td>${proveedor.mail} </td>
               <td><button  onClick="editarProveedor()" style="color:green;background-color:transparent;border:none;padding:0;cursor:pointer;padding-right:10px"><i class="fa-solid fa-pen"></i></button></td>
               <td><button  onClick="deleteProveedor()" style="color:rgb(242, 93, 93);background-color:transparent;border:none;padding:0;cursor:pointer;"><i class="fa-solid fa-trash-can " ></i></button></td>  
           </tr>
   
           ` 
       });
   }

const boton_agregar = document.querySelector('.boton_agregar');
const formLinks_prov = document.querySelector('.formulario');
const boton_quitar = document.querySelector('.boton_quitar');

boton_agregar.addEventListener('click', () => {
    formLinks_prov.classList.toggle('activar_form'); // Alternar la clase 'active' en el contenedor de enlaces
});
boton_quitar.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation(); // Detener la propagación del evento click
    formLinks_prov.classList.toggle('activar_form'); // Alternar la clase 'activar_form' en el formulario
});

function validacion() {
    // Obtener los valores de los campos de entrada
    var nombre = document.getElementById("nombre").value;
    var correo = document.getElementById("correo").value;
    var telefono = document.getElementById("telefono").value;

    // Inicializar una variable de estado para controlar si hay errores
    var hayError = false;

    // Limpiar mensajes de error anteriores
    document.getElementById("mensaje-nombre").innerHTML = "";
    document.getElementById("mensaje-telefono").innerHTML = "";
    document.getElementById("mensaje-correo").innerHTML = "";


    // Validar el nombre
    if (nombre == null || nombre.length == 0) {
        document.getElementById("mensaje-nombre").innerHTML = "⚠️ El campo nombre es obligatorio";
        hayError = true;
    }

    // Validar el correo
    if (correo == null || correo.length == 0) {
        document.getElementById("mensaje-correo").innerHTML = "⚠️ El campo correo es obligatorio";
        hayError = true;
    } else if (!/^[0-9a-zA-Z._.-]+@[0-9a-zA-Z._.-]+\.[a-zA-Z]{2,6}$/.test(correo)) {
        document.getElementById("mensaje-correo").innerHTML = "⚠️ Debe escribir un correo válido";
        hayError = true;
    }

   //Validar el telefono
   if (telefono == null || telefono.length == 0) {
    document.getElementById("mensaje-telefono").innerHTML = "⚠️ El campo telefono es obligatorio";
    hayError = true;
    }else if(isNaN(telefono)){
    document.getElementById("mensaje-telefono").innerHTML = "⚠️ El telefono tiene que ser un numero";
    hayError = true;
    }

    // Devolver false si hay algún error para evitar el envío del formulario
    return !hayError;
}
