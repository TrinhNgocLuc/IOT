document.addEventListener('DOMContentLoaded', function () {
    // Simulated sensor data
    const sensorData = {
        temperature: 25,
        humidity: 50,
        light: 200,
        lightSwitch : false,
    };

    // Update sensor values on the dashboard
    function updateDashboard() {
        document.getElementById('temperature').getElementsByClassName('value')[0].innerText = sensorData.temperature + '°C';
        document.getElementById('humidity').getElementsByClassName('value')[0].innerText = sensorData.humidity + '%';
        document.getElementById('light').getElementsByClassName('value')[0].innerText = sensorData.light + ' Lux';
    }

    // Initialize chart
    const ctx = document.getElementById('iotChart').getContext('2d');
    // Tạo datasets cho từng loại dữ liệu
    const temperatureDataset = {
        label: 'Nhiệt độ',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        // fill: false,
    };

    const humidityDataset = {
        label: 'Độ ẩm',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        // fill: false,
    };

    const lightDataset = {
        label: 'Ánh sáng',
        data: [],
        backgroundColor: 'rgba(255, 255, 0, 0.2)',
        borderColor: 'rgba(255, 255, 0, 1)',
        borderWidth: 1,
        // fill: false,
    };
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [temperatureDataset, humidityDataset, lightDataset],
        },
        options: {
            scales: {
                y: {
                    min: 0,
                    max: 500,
                },
            },
        },
    });
 

    // Simulated data update and chart animation
    setInterval(function () {
        const newDataPoint = Math.random() * 30 + 20; 
        const newHumidity = Math.random() * 50 + 30; 
        const newLight = Math.random() * 200 + 100; 
        sensorData.temperature = Math.round(newDataPoint);
        sensorData.humidity = Math.round(newHumidity);
        sensorData.light = Math.round(newLight);
        updateDashboard();
        document.getElementById('temperature').setAttribute('data-above-25', newDataPoint > 25);
        document.getElementById('humidity').setAttribute('data-above-50', newHumidity > 50);
        document.getElementById('light').setAttribute('data-above-200', newLight > 200);

        const onButton = document.getElementById('onButton');
        const offButton = document.getElementById('offButton');
        const lightBulbIcon = document.getElementById('lightBulbIcon');
        const onfanButton = document.getElementById('onfanButton');
        const offfanButton = document.getElementById('offfanButton');
        const fanBulbIcon = document.getElementById('fanBulbIcon');
    
        onButton.addEventListener('click', function () {
            sensorData.lightSwitch = true;
            lightBulbIcon.classList.add('light-on');
            updateDashboard();
        });
    
        offButton.addEventListener('click', function () {
            sensorData.lightSwitch = false;
            lightBulbIcon.classList.remove('light-on');
            updateDashboard();
        });
        onfanButton.addEventListener('click', function () {
            sensorData.lightSwitch = true;
            fanBulbIcon.classList.add('rotation-icon-on');
            updateDashboard();
        });
    
        offfanButton.addEventListener('click', function () {
            sensorData.lightSwitch = false;
            fanBulbIcon.classList.remove('rotation-icon-on');
            updateDashboard();
        });

        // Update chart data
        const timestamp = new Date().toLocaleTimeString();
        chart.data.labels.push(timestamp);

        // Cập nhật giá trị cho từng dataset
        temperatureDataset.data.push(Math.round(newDataPoint));
        humidityDataset.data.push(Math.round(newHumidity));
        lightDataset.data.push(Math.round(newLight));

        // Keep a maximum of 10 data points on the chart
        if (chart.data.labels.length > 10) {
            chart.data.labels.shift();
            temperatureDataset.data.shift();
            humidityDataset.data.shift();
            lightDataset.data.shift();
        }
        chart.update();
    }, 3000); // Update every 3 seconds
});
