import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getDatabase, ref, onChildAdded } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAyKygRkXR3VCw5wZ1-u0OZSQkdEiTTzs",
  authDomain: "project-iot-539e3.firebaseapp.com",
  databaseURL: "https://project-iot-539e3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "project-iot-539e3",
  storageBucket: "project-iot-539e3.firebasestorage.app",
  messagingSenderId: "1099276252281",
  appId: "1:1099276252281:web:0fd30957f4046c57ce90a8",
  measurementId: "G-V5KJJPVQW6"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


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

const decoded = decodeToken(token);

if (token) {
  // Giải mã token và lấy thông tin name, username

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

// Tham chiếu đến nhánh activityLog
const activityLogRef = ref(database, '/warning');

// Lấy thẻ ul để thêm các thẻ li vào
const logList = document.querySelector('.log-panel ul');

// Hàm thêm thẻ li vào danh sách
function addLogItem(time, action) {
  const li = document.createElement('li');

  // Tạo nội dung cho thẻ li
  li.innerHTML = `
    <span>${time}</span>
    <span>${action}</span>
  `;

  // Thêm thẻ li vào ul
  logList.appendChild(li);
}


// Hàm chuyển đổi UNIX timestamp thành chuỗi ngày tháng năm giờ phút giây
function formatUnixTimestamp(unixTime) {
  const date = new Date(unixTime * 1000); // Nhân với 1000 để chuyển từ giây sang mili giây
  return date.toLocaleString('en-GB', { timeZone: 'UTC' }); // Thay đổi `en-GB` và `timeZone` nếu cần
}

// Mảng lưu các bản ghi từ activityLog
const record = [];

// Lắng nghe sự kiện khi có bản ghi mới trong activityLog
onChildAdded(activityLogRef, (snapshot) => {
  const data = snapshot.val();
  const timeKey = snapshot.key; // Key của bản ghi chính là thời gian
  const time = formatUnixTimestamp(timeKey);

  const humid = data.humidity; 
  const mq2 = data.mq2; 
  const temp = data.temperature;
  const vibration = data.vibration;

  let action = "";
  if (humid > 80) {
    action += `High humidity: ${humid}% \n `;
  }
  if (mq2 > 2000) {
    action += `Smoke detected! \n`;
  }
  if (temp >= 40) {
    action += `High temperature: ${temp} C \n `;
  } 
  if (vibration > 2000) {
    action += `Vibration detected!`;
  }

  // Thêm bản ghi mới vào giao diện
  addLogItem(time, action);

  // Thêm bản ghi vào hàng đợi
  record.push({ time, action });
});




document.getElementById('sending-mail').addEventListener('click', 
  // Hàm gửi mail từ server
  function sendMailToServer() {
    if (record.length > 0) {
      const logData = record.shift(); // Lấy bản ghi cuối cùng
  
      // Gửi yêu cầu POST đến server
      fetch('/activityLog/send-mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to_email: decoded.username, // Email là username
          subject: 'Thông báo từ hệ thống IoT',
          message: `Thời gian: ${logData.time}\nHành động: ${logData.action}\n`,
        }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            alert(data.message);
          } else {
            alert("Error sending email:", data.message);
          }
        })
        .catch(error => {
          alert("Network error:", error);
        });
    } else {
      alert("No records to send.");
    }
});

 // Hàm gửi thông báo
 function sendPushSaferNotification(title, message) {
  const url = "https://www.pushsafer.com/api";

  // Dữ liệu thông báo
  const data = new URLSearchParams();
  data.append("t", title); // Tiêu đề
  data.append("m", message); // Nội dung
  data.append("k", "ylut2ht5ZZFuPJm1l0x1"); // API Key

  // Sử dụng Fetch API để gửi yêu cầu
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: data.toString(),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status === 1) {
        alert("Thông báo đã được gửi thành công!");
      } else {
        alert("Lỗi khi gửi thông báo: " + result.message);
      }
    })
    .catch((error) => {
      console.error("Có lỗi xảy ra:", error);
    });
}

 // Lắng nghe sự kiện nhấn nút
 document.getElementById("sendNotification").addEventListener("click", () => {
  const title = "Bãi đỗ xe thông minh ";
  const mobileData = record.shift(); // Lấy bản ghi cuối cùng
  const message = `Thời gian: ${mobileData.time}\nHành động: ${mobileData.action}\n`;
  sendPushSaferNotification(title, message);
})