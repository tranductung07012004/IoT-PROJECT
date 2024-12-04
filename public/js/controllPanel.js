(async function () {
  const photoresistorChartElement = document.getElementById('photoresistor-chart');
  let photoresistorChart;

  async function fetchData() {
    try {
      // Gửi yêu cầu lấy dữ liệu từ API
      const response = await fetch('/api/data'); // Đảm bảo URL phù hợp với endpoint trả về dữ liệu
      const rawData = await response.json();
      //console.log(data.photoresistor);
      const data = rawData.photoresistor;

      // Kiểm tra định dạng dữ liệu
      if (data && Array.isArray(data)) {
        const labels = data.map(item => item.timestamp); // Lấy thời gian (HH:MM)
        const values = data.map(item => item.value); // Lấy giá trị của photoresistor

        // Cập nhật biểu đồ nếu đã được khởi tạo
        if (photoresistorChart) {
          photoresistorChart.data.labels = labels;
          photoresistorChart.data.datasets[0].data = values;
          photoresistorChart.update();
        } else {
          // Khởi tạo biểu đồ nếu chưa tồn tại
          photoresistorChart = new Chart(photoresistorChartElement, {
            type: 'line',
            data: {
              labels: labels,
              datasets: [
                {
                  label: 'Photoresistor Values Over Time',
                  data: values,
                  fill: false,
                  borderColor: 'rgba(75, 192, 192, 1)',
                  tension: 0.1,
                },
              ],
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
                    text: 'Time (HH:MM)',
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: 'Photoresistor Value',
                  },
                },
              },
            },
          });
        }
      } else {
        console.error('Invalid data format for photoresistor');
      }
    } catch (error) {
      console.error('Error fetching photoresistor data:', error);
    }
  }

  // Gọi hàm để cập nhật dữ liệu mỗi 5 giây
  setInterval(fetchData, 2000);

  // Tải dữ liệu ban đầu
  await fetchData();
})();

(async function () {
  const gasSensorChartElement = document.getElementById('gasSensor-chart');
  let gasSensorChart;

  async function fetchData() {
    try {
      // Gửi yêu cầu lấy dữ liệu từ API
      const response = await fetch('/api/data'); // Đảm bảo URL phù hợp với endpoint trả về dữ liệu
      const rawData = await response.json();
      //console.log(data.photoresistor);
      const data = rawData.gasSensor;

      // Kiểm tra định dạng dữ liệu
      if (data && Array.isArray(data)) {
        const labels = data.map(item => item.timestamp); // Lấy thời gian (HH:MM)
        const values = data.map(item => item.value); // Lấy giá trị của photoresistor

        // Cập nhật biểu đồ nếu đã được khởi tạo
        if (gasSensorChart) {
          gasSensorChart.data.labels = labels;
          gasSensorChart.data.datasets[0].data = values;
          gasSensorChart.update();
        } else {
          // Khởi tạo biểu đồ nếu chưa tồn tại
          gasSensorChart = new Chart(gasSensorChartElement, {
            type: 'line',
            data: {
              labels: labels,
              datasets: [
                {
                  label: 'Gas sensor Values Over Time',
                  data: values,
                  fill: false,
                  borderColor: 'rgba(75, 192, 192, 1)',
                  tension: 0.1,
                },
              ],
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
                    text: 'Time (HH:MM)',
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: 'gas sensor value',
                  },
                },
              },
            },
          });
        }
      } else {
        console.error('Invalid data format for gas sensor');
      }
    } catch (error) {
      console.error('Error fetching gas sensor data:', error);
    }
  }

  // Gọi hàm để cập nhật dữ liệu mỗi 5 giây
  setInterval(fetchData, 2000);

  // Tải dữ liệu ban đầu
  await fetchData();
})();

(async function () {
  const vibrationSensorChartElement = document.getElementById('vibration-chart');
  let vibrationSensorChart;

  async function fetchData() {
    try {
      // Gửi yêu cầu lấy dữ liệu từ API
      const response = await fetch('/api/data'); // Đảm bảo URL phù hợp với endpoint trả về dữ liệu
      const rawData = await response.json();
      //console.log(data.photoresistor);
      const data = rawData.vibrationSensor;

      // Kiểm tra định dạng dữ liệu
      if (data && Array.isArray(data)) {
        const labels = data.map(item => item.timestamp); // Lấy thời gian (HH:MM)
        const values = data.map(item => item.value); // Lấy giá trị của photoresistor

        // Cập nhật biểu đồ nếu đã được khởi tạo
        if (vibrationSensorChart) {
          vibrationSensorChart.data.labels = labels;
          vibrationSensorChart.data.datasets[0].data = values;
          vibrationSensorChart.update();
        } else {
          // Khởi tạo biểu đồ nếu chưa tồn tại
          vibrationSensorChart = new Chart(vibrationSensorChartElement, {
            type: 'line',
            data: {
              labels: labels,
              datasets: [
                {
                  label: 'Vibration Values Over Time',
                  data: values,
                  fill: false,
                  borderColor: 'rgba(75, 192, 192, 1)',
                  tension: 0.1,
                },
              ],
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
                    text: 'Time (HH:MM)',
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: 'vibration sensor value',
                  },
                },
              },
            },
          });
        }
      } else {
        console.error('Invalid data format for vibration sensor');
      }
    } catch (error) {
      console.error('Error fetching vibration sensor data:', error);
    }
  }

  // Gọi hàm để cập nhật dữ liệu mỗi 5 giây
  setInterval(fetchData, 2000);

  // Tải dữ liệu ban đầu
  await fetchData();
})();






// (async function() {
//   const gasSensorChartElement = document.getElementById('gasSensor-chart');
//   let gasSensorChart;

//   async function fetchData() {
//     try {
//       const response = await fetch('/api/data');
//       const data = await response.json();

//       // Xử lý dữ liệu cho gasSensor
//       if (gasSensorChart) {
//         gasSensorChart.data.labels = data.gasSensor.map(row => new Date(row.timestamp).toLocaleTimeString());
//         gasSensorChart.data.datasets[0].data = data.gasSensor.map(row => row.value);
//         gasSensorChart.update();
//       } else {
//         gasSensorChart = new Chart(gasSensorChartElement, {
//           type: 'line',
//           data: {
//             labels: data.gasSensor.map(row => new Date(row.timestamp).toLocaleTimeString()),
//             datasets: [
//               {
//                 label: 'Gas Sensor Values Over Time',
//                 data: data.gasSensor.map(row => row.value),
//                 fill: false,
//                 borderColor: 'rgba(75, 192, 192, 1)',
//                 tension: 0.1,
//               }
//             ]
//           },
//           options: {
//             responsive: true,
//             plugins: {
//               legend: {
//                 display: true,
//               },
//             },
//             scales: {
//               x: {
//                 title: {
//                   display: true,
//                   text: 'Time of Day',
//                 },
//               },
//               y: {
//                 title: {
//                   display: true,
//                   text: 'Returned Value',
//                 },
//               },
//             },
//           },
//         });
//       }
//     } catch (error) {
//       console.error('Error fetching gas sensor data:', error);
//     }
//   }

//   // Gọi hàm để cập nhật dữ liệu mỗi 2 giây
//   setInterval(fetchData, 2000);

//   // Lần đầu tiên tải dữ liệu
//   await fetchData();
// })();

// (async function() {
//   const vibrationChartElement = document.getElementById('vibration-chart');
//   let vibrationChart;

//   async function fetchData() {
//     try {
//       const response = await fetch('/api/data');
//       const data = await response.json();

//       // Xử lý dữ liệu cho vibrationSensor
//       if (vibrationChart) {
//         vibrationChart.data.labels = data.vibrationSensor.map(row => new Date(row.timestamp).toLocaleTimeString());
//         vibrationChart.data.datasets[0].data = data.vibrationSensor.map(row => row.value);
//         vibrationChart.update();
//       } else {
//         vibrationChart = new Chart(vibrationChartElement, {
//           type: 'line',
//           data: {
//             labels: data.vibrationSensor.map(row => new Date(row.timestamp).toLocaleTimeString()),
//             datasets: [
//               {
//                 label: 'Vibration Sensor Values Over Time',
//                 data: data.vibrationSensor.map(row => row.value),
//                 fill: false,
//                 borderColor: 'rgba(75, 192, 192, 1)',
//                 tension: 0.1,
//               }
//             ]
//           },
//           options: {
//             responsive: true,
//             plugins: {
//               legend: {
//                 display: true,
//               },
//             },
//             scales: {
//               x: {
//                 title: {
//                   display: true,
//                   text: 'Time of Day',
//                 },
//               },
//               y: {
//                 title: {
//                   display: true,
//                   text: 'Returned Value',
//                 },
//               },
//             },
//           },
//         });
//       }
//     } catch (error) {
//       console.error('Error fetching vibration sensor data:', error);
//     }
//   }

//   // Gọi hàm để cập nhật dữ liệu mỗi 4 giây
//   setInterval(fetchData, 4000);

//   // Lần đầu tiên tải dữ liệu
//   await fetchData();
// })();
