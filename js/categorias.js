fetch('../json/categoria.json')
.then((respuesta) => respuesta.json())
.then((data) => {
    contenedorCategoria(data);
});
const contenedorCategoria=(data)=>{
let contenedorCategoria =document.getElementById('categoriaContenedor')
contenedorCategoria.innerHTML=''
data.forEach(categoria => {
    contenedorCategoria.innerHTML +=` 
     <tr>
         <td>${categoria.categoriaName}</td>
         <td>${categoria.proveedor} </td>
         <td><button  onClick="editarProveedor()" style="color:green;background-color:transparent;border:none;padding:0;cursor:pointer;padding-right:10px"><i class="fa-solid fa-pen"></i></button></td>
         <td><button  onClick="deleteProveedor()" style="color:rgb(242, 93, 93);background-color:transparent;border:none;padding:0;cursor:pointer;"><i class="fa-solid fa-trash-can " ></i></button></td>  
     </tr>  
    ` 
});
}

const editarProveedor=()=>{
    alert("No implementado")
   }
   const deleteProveedor=()=>{
       alert("No implementado")
   }

   const boton_agregar = document.querySelector('.boton_agregar');
   const formLinks_categ = document.querySelector('.formulario');
   const formLinks_categ_1 = document.querySelector('.formulario');
   const boton_quitar = document.querySelector('.boton_quitar');
   boton_agregar.addEventListener('click', () => {
       formLinks_categ.classList.toggle('activar_form'); // Alternar la clase 'active' en el contenedor de enlaces
   });
   boton_quitar.addEventListener('click', () => {
       formLinks_categ_1.classList.toggle('activar_form'); // Alternar la clase 'active' en el contenedor de enlaces
   });
   
   function validacion() {
       // Obtener los valores de los campos de entrada
       var categoria = document.getElementById("nombre").value;
       var seleccion_prov = document.getElementById("proveedor").selectedIndex;
       // Inicializar una variable de estado para controlar si hay errores
       var hayError = false;
   
       // Limpiar mensajes de error anteriores
       document.getElementById("mensaje-categoria").innerHTML = "";
       document.getElementById("mensaje-seleccion-prov").innerHTML = "";
    
   
   
       // Validar el nombre
       if (categoria == null || categoria.length == 0) {
           document.getElementById("mensaje-categoria").innerHTML = "⚠️ El campo nombre es obligatorio";
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
   