function CantidadStock(done){

const results = fetch('https://fakestoreapi.com/products');

results.then(res=>res.json()).then(data=> {done(data)});

}
 
CantidadStock((data) => {

    document.getElementById("cantidadProductos").innerHTML = data.length;

    const tablaBody = document.getElementById('tablaBody');
    tablaBody.innerHTML = ''; // Limpiar el contenido actual de la tabla

    data.forEach((producto) => {
        console.log(producto); // Verifica la estructura del objeto producto en la consola
        // Resto del código para crear y agregar filas a la tabla
    });
    data.forEach((producto) => {
        const { id, title, category, price, rating } = producto;

        if (rating.rate >= 4.5) { // Filtrar productos con rating mayor o igual a 4.5
            const fila = document.createElement('tr');

            // Crear celdas para cada propiedad del producto


 
            const idCell = document.createElement('td');
            idCell.textContent = id;

            const tituloCell = document.createElement('td');
            tituloCell.textContent = title;
            const maxLength = 50;
            if (title.length > maxLength) {
                tituloCell.textContent = title.slice(0, maxLength) + '...';
            }
            

            const categoriaCell = document.createElement('td');
            categoriaCell.textContent = category;
            /*const ratingCell = document.createElement('td');
            ratingCell.textContent = rating.rate;*/
            const precioCell = document.createElement('td');
            precioCell.textContent = `$${price}`;
            const cantidadCell = document.createElement('td');
            cantidadCell.textContent = rating.count;

            // Agregar celdas a la fila
            

            fila.appendChild(idCell);
            fila.appendChild(tituloCell);
            fila.appendChild(categoriaCell);
            /*fila.appendChild(ratingCell);*/
            fila.appendChild(precioCell);
            fila.appendChild(cantidadCell);

            // Agregar la fila a la tabla
          
            tablaBody.appendChild(fila);
             
        }
    });
    // Datos de ejemplo (categorías y ventas)--------------------------------------------------------------------------
// Obtener los datos de la API y procesarlos
CantidadStock((data) => {
    // Objeto para almacenar las ventas por categoría
    const ventasPorCategoria = {};

    // Calcular las ventas totales y las ventas por categoría
    let ventasTotales = 0;
    data.forEach((producto) => {
        const { category, rating } = producto;
        const ventas = rating.count;

        // Sumar las ventas totales y a la categoría correspondiente
        ventasTotales += ventas;
        if (category in ventasPorCategoria) {
            ventasPorCategoria[category] += ventas;
        } else {
            ventasPorCategoria[category] = ventas;
        }
    });

    // Extraer etiquetas (categorías) y valores (porcentajes) del objeto
    const labels = Object.keys(ventasPorCategoria) ;
    const valores = Object.values(ventasPorCategoria);

    // Crear el gráfico de pastel con Chart.js
    const ctx = document.getElementById('miGrafico').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: valores,
                backgroundColor: getRandomColors(labels.length),
                
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
           
        }
    });
});

// Función para generar colores aleatorios
function getRandomColors(num) {
    const colors = [];
    for (let i = 0; i < num; i++) {
        const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
        colors.push(color);
    }
    return colors;
}


});
