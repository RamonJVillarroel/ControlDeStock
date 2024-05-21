function validacionFooter(){
    var nombre = document.getElementById("nombre-footer").value;
    var correo = document.getElementById("correo-footer").value;
    var comentario = document.getElementById("comentario-footer").value;

     // Inicializar una variable de estado para controlar si hay errores
     var hayError = false;

     // Limpiar mensajes de error anteriores
     document.getElementById("mensaje-nombre-footer").innerHTML = "";
     document.getElementById("mensaje-correo-footer").innerHTML = "";
     document.getElementById("mensaje-comentario-footer").innerHTML = "";

      // Validar el nombre
    if (nombre == null || nombre.length == 0) {
        document.getElementById("mensaje-nombre-footer").innerHTML = "⚠️ El campo nombre y apellido es obligatorio";
        hayError = true;
    }

    // Validar el correo
    if (correo == null || correo.length == 0) {
        document.getElementById("mensaje-correo-footer").innerHTML = "⚠️ El campo correo es obligatorio";
        hayError = true;
    } else if (!/^[0-9a-zA-Z._.-]+@[0-9a-zA-Z._.-]+\.[a-zA-Z]{2,6}$/.test(correo)) {
        document.getElementById("mensaje-correo-footer").innerHTML = "⚠️ Debe escribir un correo válido";
        hayError = true;
    }

    //Validar Comentarios
    if (comentario == null || comentario.length == 0) {
        document.getElementById("mensaje-comentario-footer").innerHTML = "⚠️ El campo de comentarios es obligatorio";
        hayError = true;
    }

    // Devolver false si hay algún error para evitar el envío del formulario
    return !hayError;
}
document.addEventListener("DOMContentLoaded", function() {
    fetch('../views/footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer').innerHTML = data;
    });
});