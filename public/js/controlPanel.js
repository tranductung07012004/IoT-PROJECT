// (async function () {
//   const photoresistorChartElement = document.getElementById('photoresistor-chart');
//   let photoresistorChart;

//   async function fetchData() {
//     try {
//       // Gửi yêu cầu lấy dữ liệu từ API
//       const response = await fetch('/api/data'); // Đảm bảo URL phù hợp với endpoint trả về dữ liệu
//       const rawData = await response.json();
//       //console.log(data.photoresistor);
//       const data = rawData.photoresistor;

//       // Kiểm tra định dạng dữ liệu
//       if (data && Array.isArray(data)) {
//         const labels = data.map(item => item.timestamp); // Lấy thời gian (HH:MM)
//         const values = data.map(item => item.value); // Lấy giá trị của photoresistor

//         // Cập nhật biểu đồ nếu đã được khởi tạo
//         if (photoresistorChart) {
//           photoresistorChart.data.labels = labels;
//           photoresistorChart.data.datasets[0].data = values;
//           photoresistorChart.update();
//         } else {
//           // Khởi tạo biểu đồ nếu chưa tồn tại
//           photoresistorChart = new Chart(photoresistorChartElement, {
//             type: 'line',
//             data: {
//               labels: labels,
//               datasets: [
//                 {
//                   label: 'Photoresistor Values Over Time',
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
//                     text: 'Photoresistor Value',
//                   },
//                 },
//               },
//             },
//           });
//         }
//       } else {
//         console.error('Invalid data format for photoresistor');
//       }
//     } catch (error) {
//       console.error('Error fetching photoresistor data:', error);
//     }
//   }

//   // Gọi hàm để cập nhật dữ liệu mỗi 5 giây
//   setInterval(fetchData, 4000);

//   // Tải dữ liệu ban đầu
//   await fetchData();
// })();

// (async function () {
//   const gasSensorChartElement = document.getElementById('gasSensor-chart');
//   let gasSensorChart;

//   async function fetchData() {
//     try {
//       // Gửi yêu cầu lấy dữ liệu từ API
//       const response = await fetch('/api/data'); // Đảm bảo URL phù hợp với endpoint trả về dữ liệu
//       const rawData = await response.json();
//       //console.log(data.photoresistor);
//       const data = rawData.gasSensor;

//       // Kiểm tra định dạng dữ liệu
//       if (data && Array.isArray(data)) {
//         const labels = data.map(item => item.timestamp); // Lấy thời gian (HH:MM)
//         const values = data.map(item => item.value); // Lấy giá trị của photoresistor

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
//       const response = await fetch('/api/data'); // Đảm bảo URL phù hợp với endpoint trả về dữ liệu
//       const rawData = await response.json();
//       //console.log(data.photoresistor);
//       const data = rawData.vibrationSensor;

//       // Kiểm tra định dạng dữ liệu
//       if (data && Array.isArray(data)) {
//         const labels = data.map(item => item.timestamp); // Lấy thời gian (HH:MM)
//         const values = data.map(item => item.value); // Lấy giá trị của photoresistor

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

// Lấy các thành phần DOM của vehicle out
const leftArrowOut = document.getElementById('left-arrow-out');
const rightArrowOut = document.getElementById('right-arrow-out');
const vehicleIdElementOut = document.getElementById('vehicle-id-out'); // Thẻ chứa index
const vehicleImageOut = document.getElementById('vehicle-image-out');
const licensePlateElementOut = document.getElementById('license-plate-out');
const timeOutElement = document.getElementById('time-out');

const leftArrowIn = document.getElementById('left-arrow-in');
const rightArrowIn = document.getElementById('right-arrow-in');
const vehicleIdElementIn = document.getElementById('vehicle-id-in'); // Thẻ chứa index
const vehicleImageIn = document.getElementById('vehicle-image-in');
const licensePlateElementIn = document.getElementById('license-plate-in');
const timeInElement = document.getElementById('time-in');

// Lấy giá trị `index` hiện tại từ DOM
function getCurrentIndex(input) {
  return parseInt(input, 10); // Chuyển giá trị input thành số nguyên
}


// Hàm gọi API để lấy dữ liệu mới
async function fetchDataAtVehicle(vehicleImage, licensePlate, time, vehicleId, newIndex, in_out, arrow) {
  try {
    const response = await fetch(`/controlPanel/license-plates/${newIndex}/${in_out}/${arrow}`); // Gửi yêu cầu tới server
    console.log(response);
    
    const data = await response.json();

    if (data && data.image_url && data.license && data.time && data.index) {
      // Cập nhật giao diện với dữ liệu mới
      vehicleImage.src = data.image_url;
      licensePlate.textContent = `License plate: ${data.license}`;
      time.textContent = `Time out: ${data.time}`;
      vehicleId.textContent = `ID: ${data.index}`;
      vehicleId.dataset.index = data.index; // Cập nhật giá trị index trong DOM
    } 
    else {
      alert('No data available for the selected index.');
    }
  
  } catch (error) {
    console.error('Error fetching data:', error);
    alert('Failed to fetch data from the server.');
  }
}

// Xử lý sự kiện click
leftArrowOut.addEventListener('click', () => {
  const currentIndex = getCurrentIndex(vehicleIdElementOut.dataset.index);
  fetchDataAtVehicle(vehicleImageOut, 
                    licensePlateElementOut, 
                    timeOutElement, 
                    vehicleIdElementOut,
                    currentIndex, 
                    0, 
                    0); // Lấy dữ liệu của index nhỏ hơn
});

rightArrowOut.addEventListener('click', () => {
  const currentIndex = getCurrentIndex(vehicleIdElementOut.dataset.index);
  fetchDataAtVehicle(vehicleImageOut, 
                    licensePlateElementOut, 
                    timeOutElement, 
                    vehicleIdElementOut,
                    currentIndex, 
                    0, 
                    1); // Lấy dữ liệu của index lớn hơn
          
});

leftArrowIn.addEventListener('click', () => {
  const currentIndex = getCurrentIndex(vehicleIdElementIn.dataset.index);
    //fetchData(currentIndex, 1, 0); // Lấy dữ liệu của index nhỏ hơn
    fetchDataAtVehicle(vehicleImageIn, 
                      licensePlateElementIn, 
                      timeInElement, 
                      vehicleIdElementIn,
                      currentIndex, 
                      1, 
                      0); 
});

rightArrowIn.addEventListener('click', () => {
  const currentIndex = getCurrentIndex(vehicleIdElementIn.dataset.index);
    //fetchData(currentIndex, 1, 1); // Lấy dữ liệu của index lớn hơn
    fetchDataAtVehicle(vehicleImageIn, 
                      licensePlateElementIn, 
                      timeInElement, 
                      vehicleIdElementIn,
                      currentIndex, 
                      1, 
                      1); 
});


let isAutoFetchEnabledOut = true; // Biến trạng thái cho tính năng tự động
let autoFetchIntervalOut; // Biến lưu trữ ID của setInterval để có thể dừng lại khi cần
let isAutoFetchEnabledIn = true; 
let autoFetchIntervalIn; 

// Hàm bật/tắt tự động fetch khi click vào nút
document.getElementById('auto-loading-out').addEventListener('click', function() {
  if (isAutoFetchEnabledOut) {
    // Tắt tính năng tự động fetch
    clearInterval(autoFetchIntervalOut); // Dừng lại interval
    isAutoFetchEnabledOut = false;
    this.src = './img/tick.svg'; // Thay đổi biểu tượng nút
  } else {
    // Bật lại tính năng tự động fetch
    isAutoFetchEnabledOut = true;
    this.src = './img/auto-loading.svg'; // Thay đổi biểu tượng nút
    startAutoFetchVehicleOut(); // Khởi động lại tự động fetch
  }
});

document.getElementById('auto-loading-in').addEventListener('click', function() {
  if (isAutoFetchEnabledIn) {
    // Tắt tính năng tự động fetch
    clearInterval(autoFetchIntervalIn); // Dừng lại interval
    isAutoFetchEnabledIn = false;
    this.src = './img/tick.svg'; // Thay đổi biểu tượng nút
  } else {
    // Bật lại tính năng tự động fetch
    isAutoFetchEnabledIn = true;
    this.src = './img/auto-loading.svg'; // Thay đổi biểu tượng nút
    startAutoFetchVehicleIn(); // Khởi động lại tự động fetch
  }
});


async function fetchDataIntervalAtVehicle(vehicleImage, licensePlate, time, vehicleId, in_out) {
  try {
    const response = await fetch(`/controlPanel/license-plates/${in_out}`); // Gửi yêu cầu tới server
    
    const data = await response.json();

    if (data && data.image_url && data.license && data.time && data.index) {
      // Cập nhật giao diện với dữ liệu mới
      vehicleImage.src = data.image_url;
      licensePlate.textContent = `License plate: ${data.license}`;
      time.textContent = `Time out: ${data.time}`;
      vehicleId.textContent = `ID: ${data.index}`;
      vehicleId.dataset.index = data.index; // Cập nhật giá trị index trong DOM
    } 
  
  } catch (error) {
    console.error('Error fetching data:', error);
    alert('Failed to fetch data from the server.');
  }
}

// Hàm bắt đầu tự động fetch dữ liệu mỗi 5 giây
function startAutoFetchVehicleOut() {
  
  autoFetchIntervalOut = setInterval(() => {
    fetchDataIntervalAtVehicle(vehicleImageOut, 
                              licensePlateElementOut, 
                              timeOutElement, 
                              vehicleIdElementOut,
                              0); 
  }, 5000); // Gọi hàm mỗi 5 giây
}

function startAutoFetchVehicleIn() {
  
  autoFetchIntervalIn = setInterval(() => {
    fetchDataIntervalAtVehicle(vehicleImageIn, 
                              licensePlateElementIn, 
                              timeInElement, 
                              vehicleIdElementIn,
                              1); 
  }, 5000); // Gọi hàm mỗi 5 giây
}

// Bắt đầu tự động fetch ngay khi load trang
if (isAutoFetchEnabledOut) {
  startAutoFetchVehicleOut();
}

if (isAutoFetchEnabledIn) {
  startAutoFetchVehicleIn();
}
