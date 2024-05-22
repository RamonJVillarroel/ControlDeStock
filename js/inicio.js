document.addEventListener("DOMContentLoaded", function() {
    fetch('../views/inicio.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('inicio').innerHTML = data;
    });
});