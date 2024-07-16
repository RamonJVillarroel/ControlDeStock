
function CantidadStock(done){

const results = fetch('/views/productos');

results.then(res=>res.json()).then(data=> {done(data)});

}
 
CantidadStock((data) => {
    document.getElementById("cantidadProductos").innerHTML = data.length;
    
    const tablaBody = document.getElementById('tablaBody');
    tablaBody.innerHTML = ''; // Limpiar el contenido actual de la tabla

    
    data.forEach((producto) => {
        const { id, title, category, price, rating } = producto;


        if (rating.count >= 400) { // Filtrar productos con ventas mayor o igual a 400

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
    
    // Objeto para almacenar las ventas por categoría
    const ventasPorCategoria = {};
    const preciosPorCategoria = {};
    // Calcular las ventas totales y las ventas por categoría
    let ventasTotales = 0;
    let preciosTotales = 0;
    let preciosDiarios = 0;
    data.forEach((producto) => {
        const { category, price, rating } = producto;
        const ventas = rating.count;
        const prices = price;
        // Sumar las ventas totales y a la categoría correspondiente
        ventasTotales += ventas;
        preciosDiarios += prices;
        preciosTotales += prices*ventas;
        
        if (category in preciosPorCategoria) {
            preciosPorCategoria[category] += prices*ventas;
            
        } else {
            preciosPorCategoria[category] = prices*ventas;
        }

        if (category in ventasPorCategoria) {
            ventasPorCategoria[category] += ventas;
            
        } else {
            ventasPorCategoria[category] = ventas;
        }
    });

    document.getElementById("ingDiarios").innerHTML = '$ ' + parseInt(preciosDiarios);
    document.getElementById("ingTotales").innerHTML = '$ ' + parseInt(preciosTotales);

    // Extraer etiquetas (categorías) y valores (ventas) del objeto
    const labels = Object.keys(ventasPorCategoria) ;
    const valores = Object.values(ventasPorCategoria);

    // Crear el gráfico de pastel con Chart.js
    const ctx = document.getElementById('miGrafico').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Cantidad de Ventas',
                data: valores,
                backgroundColor: getRandomColors(labels.length),
                
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'left',
                    labels: {
                        color: 'white' // Color de las etiquetas de la leyenda
                    }
                }
            }
        }
    });

    // Extraer etiquetas (categorías) y valores (precio) del objeto
    const categorias = Object.keys(preciosPorCategoria) ;
    const ingresos = Object.values(preciosPorCategoria);

    // Crear el gráfico de barras vertical con Chart.js
    const ctx1 = document.getElementById('miGraficoBarras').getContext('2d');
    new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: categorias,
            datasets: [{
                label: 'Ingresos por Categoría',
                data: ingresos,
                backgroundColor: getRandomColors(labels.length), // Color de las barras
                borderColor: 'rgba(54, 162, 235, 1)', // Borde de las barras
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    ticks: {
                        color: 'white', // Color de las etiquetas (categorías)
                        font: {
                            weight: 'bold' // Establecer negrita para las etiquetas
                        }
                    }
                },
                y: {
                    beginAtZero: true, // Iniciar el eje Y en 0
                    ticks: {
                        color: 'white', // Color de las etiquetas (ingresos)
                        callback: (value) => `${value} $` // Agregar símbolo de dólar a los ticks del eje Y
                    }
                }
            },
            plugins: {
                legend: {
                    display: false // Ocultar la leyenda (incluyendo los labels de clic)
                }
            }
        }
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
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active'); // Alternar la clase 'active' en el contenedor de enlaces
});