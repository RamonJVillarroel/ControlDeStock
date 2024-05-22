const boton_iniciar = document.querySelector('.boton_iniciar');
const formLinks_login = document.querySelector('.formulario_inicio');

boton_iniciar.addEventListener('click', () => {
    formLinks_login.classList.toggle('activar_form_inicio'); // Alternar la clase 'active' en el contenedor de enlaces
});

function validacion_usuario() {
    // Obtener los valores de los campos de entrada
    var usuario = document.getElementById("usuario").value;
    var password = document.getElementById("password").value;
    var nombre_usuario = "admin";
    var password_usuario = "admin";

    // Inicializar una variable de estado para controlar si hay errores
    var hayError = false;

    // Limpiar mensajes de error anteriores
    document.getElementById("mensaje-usuario").innerHTML = "";
    document.getElementById("mensaje-password").innerHTML = "";

    // Validar el nombre
    if (usuario == null || usuario.length == 0 || usuario!=nombre_usuario) {
        document.getElementById("mensaje-usuario").innerHTML = "⚠️ Usuario incorrecto";
        hayError = true;
    }

     //Validar la cantidad de productos
     if (password == null || password.length == 0 || password!=password_usuario) {
        document.getElementById("mensaje-password").innerHTML = "⚠️ Contraseña incorrecta";
        hayError = true;
    }

    // Devolver false si hay algún error para evitar el envío del formulario
    return !hayError;
}
