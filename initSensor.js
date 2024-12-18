const admin = require("firebase-admin");
const path = require("path");

// Khởi tạo Firebase Admin SDK
const serviceAccount = require('./services/iot-project-383ff-firebase-adminsdk-vgmgx-be083cd490.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://iot-project-383ff-default-rtdb.asia-southeast1.firebasedatabase.app/",
});

// Tham chiếu đến Realtime Database
const db = admin.database();

// Hàm thêm dữ liệu vào Realtime Database
function addSensorData(time, data) {
  const ref = db.ref(`sensorData/${time}`); // Tạo đường dẫn tới key thời gian

  // Ghi dữ liệu
  ref
    .set(data)
    .then(() => {
      console.log(`Dữ liệu tại ${time} đã được thêm thành công!`);
    })
    .catch((error) => {
      console.error(`Lỗi khi thêm dữ liệu tại ${time}:`, error);
    });
}

// Tạo dữ liệu mẫu với nhiều record
const sensorDataArray = [
  {
    time: "16:55:44",
    data: {
      humidity: 60,
      light: 300,
      mq2: 450,
      temperature: 25,
      vibration: 10,
    },
  },
  {
    time: "16:56:30",
    data: {
      humidity: 62,
      light: 320,
      mq2: 460,
      temperature: 26,
      vibration: 12,
    },
  },
  {
    time: "16:57:10",
    data: {
      humidity: 58,
      light: 290,
      mq2: 440,
      temperature: 24,
      vibration: 8,
    },
  },
  {
    time: "16:58:00",
    data: {
      humidity: 65,
      light: 310,
      mq2: 470,
      temperature: 27,
      vibration: 15,
    },
  },
  {
    time: "16:59:20",
    data: {
      humidity: 61,
      light: 295,
      mq2: 455,
      temperature: 23,
      vibration: 9,
    },
  },
  {
    time: "17:00:45",
    data: {
      humidity: 59,
      light: 280,
      mq2: 435,
      temperature: 22,
      vibration: 7,
    },
  },
];

// Sử dụng vòng lặp để thêm tất cả dữ liệu vào Firebase
sensorDataArray.forEach((record) => {
  addSensorData(record.time, record.data);
});
