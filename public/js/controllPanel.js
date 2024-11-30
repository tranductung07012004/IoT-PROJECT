(async function() {
  const chartElement = document.getElementById('photoresistor-chart');
  let chart;

  async function fetchData() {
    try {
      const response = await fetch('/api/data');
      const newData = await response.json();

      // Cập nhật biểu đồ với dữ liệu mới
      if (chart) {
        chart.data.labels = newData.map(row => row.time);
        chart.data.datasets[0].data = newData.map(row => row.value);
        chart.update();
      } else {
        // Khởi tạo biểu đồ nếu chưa được tạo
        chart = new Chart(chartElement, {
          type: 'line',
          data: {
            labels: newData.map(row => row.time),
            datasets: [
              {
                label: 'Values over time',
                data: newData.map(row => row.value),
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1,
              }
            ]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: true,
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Time of Day',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Returned Value',
                },
              },
            },
          },
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // Gọi hàm để cập nhật dữ liệu mỗi 2 giây
  setInterval(fetchData, 2000);

  // Lần đầu tiên tải dữ liệu
  await fetchData();
})();


(async function() {
  const chartElement = document.getElementById('gasSensor-chart');
  let chart;

  async function fetchData() {
    try {
      const response = await fetch('/api/data');
      const newData = await response.json();

      // Cập nhật biểu đồ với dữ liệu mới
      if (chart) {
        chart.data.labels = newData.map(row => row.time);
        chart.data.datasets[0].data = newData.map(row => row.value);
        chart.update();
      } else {
        // Khởi tạo biểu đồ nếu chưa được tạo
        chart = new Chart(chartElement, {
          type: 'line',
          data: {
            labels: newData.map(row => row.time),
            datasets: [
              {
                label: 'Values over time',
                data: newData.map(row => row.value),
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1,
              }
            ]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: true,
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Time of Day',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Returned Value',
                },
              },
            },
          },
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // Gọi hàm để cập nhật dữ liệu mỗi 2 giây
  setInterval(fetchData, 2000);

  // Lần đầu tiên tải dữ liệu
  await fetchData();
})();



(async function() {
  const chartElement = document.getElementById('vibration-chart');
  let chart;

  async function fetchData() {
    try {
      const response = await fetch('/api/data');
      const newData = await response.json();

      // Cập nhật biểu đồ với dữ liệu mới
      if (chart) {
        chart.data.labels = newData.map(row => row.time);
        chart.data.datasets[0].data = newData.map(row => row.value);
        chart.update();
      } else {
        // Khởi tạo biểu đồ nếu chưa được tạo
        chart = new Chart(chartElement, {
          type: 'line',
          data: {
            labels: newData.map(row => row.time),
            datasets: [
              {
                label: 'Values over time',
                data: newData.map(row => row.value),
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1,
              }
            ]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: true,
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Time of Day',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Returned Value',
                },
              },
            },
          },
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // Gọi hàm để cập nhật dữ liệu mỗi 2 giây
  setInterval(fetchData, 2000);

  // Lần đầu tiên tải dữ liệu
  await fetchData();
})();




