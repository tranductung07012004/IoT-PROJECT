

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

    if (data && data.image_url && data.plate_number && data.timestamp && data.index) {
      // Cập nhật giao diện với dữ liệu mới
      vehicleImage.src = data.image_url;
      licensePlate.textContent = `License plate: ${data.plate_number}`;
      time.textContent = `Time: ${data.timestamp}`;
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

    if (data && data.image_url && data.plate_number && data.timestamp && data.index) {
      // Cập nhật giao diện với dữ liệu mới
      vehicleImage.src = data.image_url;
      licensePlate.textContent = `License plate: ${data.plate_number}`;
      time.textContent = `Time: ${data.timestamp}`;
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
