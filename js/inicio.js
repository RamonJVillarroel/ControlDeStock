document.addEventListener("DOMContentLoaded", function() {
    fetch('/views/login')
    .then(response => response.text())
    .then(data => {
        document.getElementById('inicio').innerHTML = data;
    });
});