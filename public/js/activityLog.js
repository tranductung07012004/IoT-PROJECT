// Cấu hình Firebase
// import { initializeApp } from "firebase/app";
// import { getDatabase, ref, onChildAdded } from "firebase/database";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getDatabase, ref, onChildAdded } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB32zeYcjfOLUZtzAjMQA8bkolit0CAMWg",
  authDomain: "iot-project-383ff.firebaseapp.com",
  databaseURL: "https://iot-project-383ff-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "iot-project-383ff",
  storageBucket: "iot-project-383ff.firebasestorage.app",
  messagingSenderId: "985732567680",
  appId: "1:985732567680:web:2c16c434b0e8bc80ec8c65",
  measurementId: "G-R7890VD6V0"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Tham chiếu đến nhánh activityLog
const activityLogRef = ref(database, '/activityLog');

// Lấy thẻ ul để thêm các thẻ li vào
const logList = document.querySelector('.log-panel ul');

// Hàm thêm thẻ li vào danh sách
function addLogItem(time, action, happened) {
  const li = document.createElement('li');

  // Tạo nội dung cho thẻ li
  li.innerHTML = `
    <span>${time}</span>
    <span>${action}</span>
    <span>${happened}</span>
  `;

  // Thêm thẻ li vào ul
  logList.appendChild(li);
}

// Lắng nghe sự kiện khi có bản ghi mới trong activityLog
onChildAdded(activityLogRef, (snapshot) => {
  const data = snapshot.val();
  const time = snapshot.key; // Key của bản ghi chính là thời gian
  const action = data.action; // Trường action
  const happened = data.happened; // Trường happened

  // Thêm bản ghi mới vào giao diện
  addLogItem(time, action, happened);
});

 // Hàm giải mã token JWT
 function decodeToken(token) {
  try {
    const payload = token.split(".")[1]; // Lấy phần payload từ token
    // Chuyển đổi Base64 URL encoding về chuẩn Base64
    const base64 = payload.replace(/_/g, "/").replace(/-/g, "+");

    // Giải mã Base64 thành chuỗi văn bản (bao gồm các ký tự có dấu)
    const decodedPayload = new TextDecoder("utf-8").decode(Uint8Array.from(atob(base64), c => c.charCodeAt(0)));
    
    return JSON.parse(decodedPayload);  // Chuyển chuỗi thành object
  } catch (error) {
    console.error("Lỗi khi giải mã token:", error);
    return null;
  }
}

// Lấy token từ localStorage
const token = localStorage.getItem("authToken");

if (token) {
  // Giải mã token và lấy thông tin name, username
  const decoded = decodeToken(token);

  if (decoded) {
    // Chèn dữ liệu vào thẻ HTML
    document.getElementById("staff-name").textContent = `Tên: ${decoded.name}`;
    document.getElementById("staff-username").textContent = `Tài khoản: ${decoded.username}`;
  } else {
    console.error("Không thể giải mã token");
  }
} else {
  // Trường hợp không có token: hiển thị thông báo
  document.getElementById("staff-name").textContent = "Tên: Bạn chưa đăng nhập";
  document.getElementById("staff-username").textContent = "Tài khoản: Bạn chưa đăng nhập";
}
