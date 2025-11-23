document.addEventListener('DOMContentLoaded', function() {
    const chartForm = document.getElementById('chartForm');
    const myChartCanvas = document.getElementById('myChart');
    let myChart = null;

    // Función para procesar los datos del formulario
    function parseData(input) {
        const dataArray = input.split(',');
        const labels = [];
        const values = [];
        
        dataArray.forEach(item => {
            const parts = item.trim().split(':');
            if (parts.length === 2) {
                labels.push(parts[0].trim());
                values.push(parseFloat(parts[1].trim()));
            }
        });
        
        return { labels, values };
    }

    // Función para crear el gráfico
    function createChart(chartType, labels, values) {
        // Destruir gráfico anterior si existe
        if (myChart) {
            myChart.destroy();
        }

        // Configuración del gráfico
        const config = {
            type: chartType,
            data: {
                labels: labels,
                datasets: [{
                    label: 'Ventas',
                    data: values,
                    backgroundColor: [
                        '#3498db', '#2ecc71', '#e74c3c', '#f39c12',
                        '#9b59b6', '#1abc9c', '#34495e', '#d35400'
                    ],
                    borderColor: '#2c3e50',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Gráfico de Ventas'
                    }
                }
            }
        };

        // Crear nuevo gráfico
        myChart = new Chart(myChartCanvas, config);
    }

    // Manejar envío del formulario
    chartForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const chartType = document.getElementById('chartType').value;
        const dataInput = document.getElementById('dataInput').value;
        
        // Procesar datos
        const { labels, values } = parseData(dataInput);
        
        // Crear gráfico
        createChart(chartType, labels, values);
    });

    // Generar gráfico inicial
    const initialData = document.getElementById('dataInput').value;
    const { labels, values } = parseData(initialData);
    createChart('bar', labels, values);
});