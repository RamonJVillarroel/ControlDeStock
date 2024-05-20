function validacion() {
    // Obtener los valores de los campos de entrada
    var nombre = document.getElementById("nombre").value;
    var correo = document.getElementById("correo").value;
    var direccion = document.getElementById("direccion").value;
    var seleccion = document.getElementById("producto").selectedIndex;
    var cantidad = document.getElementById("cantidad").value;
    var telefono = document.getElementById("telefono").value;
    var comentario = document.getElementById("comentario").value;

    // Inicializar una variable de estado para controlar si hay errores
    var hayError = false;

    // Limpiar mensajes de error anteriores
    document.getElementById("mensaje-nombre").innerHTML = "";
    document.getElementById("mensaje-correo").innerHTML = "";
    document.getElementById("mensaje-direccion").innerHTML = "";
    document.getElementById("mensaje-seleccion").innerHTML = "";
    document.getElementById("mensaje-cantidad").innerHTML = "";
    document.getElementById("mensaje-telefono").innerHTML = "";
    document.getElementById("mensaje-comentario").innerHTML = "";

    // Validar el nombre
    if (nombre == null || nombre.length == 0) {
        document.getElementById("mensaje-nombre").innerHTML = "⚠️ El campo nombre y apellido es obligatorio";
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

    //Validar la direccion
    if (direccion == null || direccion.length == 0) {
        document.getElementById("mensaje-direccion").innerHTML = "⚠️ El campo direccion es obligatorio";
        hayError = true;
    }

    //Validar seleccion de productod
    if(seleccion == null || seleccion == 0){
        document.getElementById("mensaje-seleccion").innerHTML = "⚠️ Tenes que seleccionar alguna opcion";
        hayError = true;
    }

    //Validar la cantidad de productos
    if (cantidad == null || cantidad.length == 0) {
        document.getElementById("mensaje-cantidad").innerHTML = "⚠️ El campo cantidad es obligatorio";
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

    //Validar Comentarios
    if (comentario == null || comentario.length == 0) {
        document.getElementById("mensaje-comentario").innerHTML = "⚠️ El campo de comentarios es obligatorio";
        hayError = true;
    }

    // Devolver false si hay algún error para evitar el envío del formulario
    return !hayError;
}
