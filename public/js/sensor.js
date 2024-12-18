(async function () {
  const photoresistorChartElement = document.getElementById('photoresistor-chart');
  let photoresistorChart;

  const gasSensorChartElement = document.getElementById('gasSensor-chart');
  let gasSensorChart;

  const vibrationSensorChartElement = document.getElementById('vibration-chart');
  let vibrationSensorChart;

  const humidElement = document.getElementById("humidValue");
  const tempElement = document.getElementById("tempValue");
  async function fetchData() {
    try {
      // Gửi yêu cầu lấy dữ liệu từ API
      const response = await fetch('/controlPanel/sensorData'); // Đảm bảo URL phù hợp với endpoint trả về dữ liệu
      const rawData = await response.json();
      const photoresistorData = rawData.photoresistor;
      const gasSensorData = rawData.gasSensor;
      const vibrationData = rawData.vibrationSensor;
      const humidData = rawData.humid;
      const tempData = rawData.temp;

      humidElement.textContent = `${humidData}%`;
      tempElement.textContent = `${tempData} C`;

      // Kiểm tra định dạng dữ liệu
      if (photoresistorData && Array.isArray(photoresistorData)) {
        const labels = photoresistorData.map(item => item.time); // Lấy thời gian (HH:MM)
        const values = photoresistorData.map(item => item.light); // Lấy giá trị của photoresistor

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

      // Kiểm tra định dạng dữ liệu
      if (gasSensorData && Array.isArray(gasSensorData)) {
        const labels = gasSensorData.map(item => item.time); // Lấy thời gian (HH:MM)
        const values = gasSensorData.map(item => item.mq2); // Lấy giá trị của photoresistor

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

      // Kiểm tra định dạng dữ liệu
      if (vibrationData && Array.isArray(vibrationData)) {
        const labels = vibrationData.map(item => item.time); // Lấy thời gian (HH:MM)
        const values = vibrationData.map(item => item.vibration); // Lấy giá trị của photoresistor

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
      console.error('Error fetching photoresistor data:', error);
    }
  }

  

  // Gọi hàm để cập nhật dữ liệu mỗi 5 giây
  setInterval(fetchData, 4000);

  // Tải dữ liệu ban đầu
  await fetchData();
})();

// (async function () {
//   const gasSensorChartElement = document.getElementById('gasSensor-chart');
//   let gasSensorChart;

//   async function fetchData() {
//     try {
//       // Gửi yêu cầu lấy dữ liệu từ API
//       const response = await fetch('/controlPanel/sensorData'); // Đảm bảo URL phù hợp với endpoint trả về dữ liệu
//       const rawData = await response.json();
//       //console.log(data.photoresistor);
//       const data = rawData.gasSensor;

//       // Kiểm tra định dạng dữ liệu
//       if (data && Array.isArray(data)) {
//         const labels = data.map(item => item.time); // Lấy thời gian (HH:MM)
//         const values = data.map(item => item.mq2); // Lấy giá trị của photoresistor

//         // Cập nhật biểu đồ nếu đã được khởi tạo
//         if (gasSensorChart) {
//           gasSensorChart.data.labels = labels;
//           gasSensorChart.data.datasets[0].data = values;
//           gasSensorChart.update();
//         } else {
//           // Khởi tạo biểu đồ nếu chưa tồn tại
//           gasSensorChart = new Chart(gasSensorChartElement, {
//             type: 'line',
//             data: {
//               labels: labels,
//               datasets: [
//                 {
//                   label: 'Gas sensor Values Over Time',
//                   data: values,
//                   fill: false,
//                   borderColor: 'rgba(75, 192, 192, 1)',
//                   tension: 0.1,
//                 },
//               ],
//             },
//             options: {
//               responsive: true,
//               plugins: {
//                 legend: {
//                   display: true,
//                 },
//               },
//               scales: {
//                 x: {
//                   title: {
//                     display: true,
//                     text: 'Time (HH:MM)',
//                   },
//                 },
//                 y: {
//                   title: {
//                     display: true,
//                     text: 'gas sensor value',
//                   },
//                 },
//               },
//             },
//           });
//         }
//       } else {
//         console.error('Invalid data format for gas sensor');
//       }
//     } catch (error) {
//       console.error('Error fetching gas sensor data:', error);
//     }
//   }

//   // Gọi hàm để cập nhật dữ liệu mỗi 5 giây
//   setInterval(fetchData, 4000);

//   // Tải dữ liệu ban đầu
//   await fetchData();
// })();

// (async function () {
//   const vibrationSensorChartElement = document.getElementById('vibration-chart');
//   let vibrationSensorChart;

//   async function fetchData() {
//     try {
//       // Gửi yêu cầu lấy dữ liệu từ API
//       const response = await fetch('/controlPanel/sensorData'); // Đảm bảo URL phù hợp với endpoint trả về dữ liệu
//       const rawData = await response.json();
//       //console.log(data.photoresistor);
//       const data = rawData.vibrationSensor;

//       // Kiểm tra định dạng dữ liệu
//       if (data && Array.isArray(data)) {
//         const labels = data.map(item => item.time); // Lấy thời gian (HH:MM)
//         const values = data.map(item => item.vibration); // Lấy giá trị của photoresistor

//         // Cập nhật biểu đồ nếu đã được khởi tạo
//         if (vibrationSensorChart) {
//           vibrationSensorChart.data.labels = labels;
//           vibrationSensorChart.data.datasets[0].data = values;
//           vibrationSensorChart.update();
//         } else {
//           // Khởi tạo biểu đồ nếu chưa tồn tại
//           vibrationSensorChart = new Chart(vibrationSensorChartElement, {
//             type: 'line',
//             data: {
//               labels: labels,
//               datasets: [
//                 {
//                   label: 'Vibration Values Over Time',
//                   data: values,
//                   fill: false,
//                   borderColor: 'rgba(75, 192, 192, 1)',
//                   tension: 0.1,
//                 },
//               ],
//             },
//             options: {
//               responsive: true,
//               plugins: {
//                 legend: {
//                   display: true,
//                 },
//               },
//               scales: {
//                 x: {
//                   title: {
//                     display: true,
//                     text: 'Time (HH:MM)',
//                   },
//                 },
//                 y: {
//                   title: {
//                     display: true,
//                     text: 'vibration sensor value',
//                   },
//                 },
//               },
//             },
//           });
//         }
//       } else {
//         console.error('Invalid data format for vibration sensor');
//       }
//     } catch (error) {
//       console.error('Error fetching vibration sensor data:', error);
//     }
//   }

//   // Gọi hàm để cập nhật dữ liệu mỗi 5 giây
//   setInterval(fetchData, 4000);

//   // Tải dữ liệu ban đầu
//   await fetchData();
// })();