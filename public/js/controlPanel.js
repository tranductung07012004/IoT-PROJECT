import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";

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

const initRef = ref(database, 'control');

// Set the data in Firebase
set(initRef, "00")
.then(() => {
  console.log(`Dữ liệu init control đã được gửi`);
})
.catch((error) => {
  console.log("Lỗi khi gửi dữ liệu init control:", error);
});


let isBlockLight = false;
let isBlockBuzzer = false;
let stateLight = '0'; // bấm lock thì mới bấm được và khi bấm được là => 2
let stateBuzzer = '0'; 
let controlData;
// Get a reference to the /control path in Firebase Realtime Database
const controlRef = ref(database, 'control');

document.getElementById('light-on').addEventListener('click', function () {
  console.log(`Bạn đã chọn nhấn nút light on`);
  if (isBlockLight === true) {
    stateLight = '1';
    controlData = stateLight + stateBuzzer;

    // Set the data in Firebase
    set(controlRef, controlData)
    .then(() => {
      alert(`Dữ liệu light on đã được gửi`);
    })
    .catch((error) => {
      alert("Lỗi khi gửi dữ liệu tại light on:", error);
    });
  }
  else {
    alert('Light đã được unlock để tự hoạt động, vui lòng block lại để có thể bật tắt');
  }
});

document.getElementById('light-off').addEventListener('click', function () {
  console.log(`Bạn đã chọn nhấn nút light off`);
  if (isBlockLight === true) {
    stateLight = '2';
    controlData = stateLight + stateBuzzer;

    // Set the data in Firebase
    set(controlRef, controlData)
    .then(() => {
      alert(`Dữ liệu light off đã được gửi`);
    })
    .catch((error) => {
      alert("Lỗi khi gửi dữ liệu tại light off:", error);
    });
  } else {
    alert('Light đã được unlock để tự hoạt động, vui lòng block lại để có thể bật tắt');
  }
});

document.getElementById('block-light').addEventListener('click', function () {
  console.log(`Bạn đã chọn nhấn nút block light auto`);
  if (isBlockLight === true) {
    document.getElementById('block-light').textContent = "Block";
    isBlockLight = false;
    stateLight = '0';
    controlData = stateLight + stateBuzzer;

    // Set the data in Firebase
    set(controlRef, controlData)
    .then(() => {
      alert(`Dữ liệu unblock light đã được gửi`);
    })
    .catch((error) => {
      alert("Lỗi khi gửi dữ liệu tại unblock light:", error);
    });
  }
  else {
    document.getElementById('block-light').textContent = "Unblock";
    isBlockLight = true;
    stateLight = '2';
    controlData = stateLight + stateBuzzer;

    set(controlRef, controlData)
    .then(() => {
      alert(`Dữ liệu block light đã được gửi`);
    })
    .catch((error) => {
      alert("Lỗi khi gửi dữ liệu tại block light:", error);
    });
  }
});


document.getElementById('buzzer-on').addEventListener('click', function () {
  console.log(`Bạn đã chọn nhấn nút buzzer on`);

  if (isBlockBuzzer === true) {
    stateBuzzer = '1';
    controlData = stateLight + stateBuzzer;

    // Get a reference to the /control path in Firebase Realtime Database
    const controlRef = ref(database, 'control');

    // Set the data in Firebase
    set(controlRef, controlData)
    .then(() => {
      alert(`Dữ liệu buzzer on đã được gửi`);
    })
    .catch((error) => {
      alert("Lỗi khi gửi dữ liệu tại buzzer on:", error);
    });
  }
  else {
    alert('Buzzer đang được unlock để tự hoạt động, vui lòng block lại để có thể bật tắt');
  }
});

document.getElementById('buzzer-off').addEventListener('click', function () {
  console.log(`Bạn đã chọn nhấn nút buzzer off`);

  if (isBlockBuzzer === true) {
    stateBuzzer = '2';
    controlData = stateLight + stateBuzzer;

    // Get a reference to the /control path in Firebase Realtime Database
    const controlRef = ref(database, 'control');

    // Set the data in Firebase
    set(controlRef, controlData)
    .then(() => {
      alert(`Dữ liệu buzzer off đã được gửi`);
    })
    .catch((error) => {
      alert("Lỗi khi gửi dữ liệu tại buzzer off:", error);
    });
  }
  else {
    alert('Buzzer đang được unlock để tự hoạt động, vui lòng block lại để có thể bật tắt');
  }
});

document.getElementById('block-buzzer').addEventListener('click', function () {
  console.log(`Bạn đã chọn nhấn nút block buzzer auto`);

  if (isBlockBuzzer === true) {
    document.getElementById('block-buzzer').textContent = "Block";
    isBlockBuzzer = false;
    stateBuzzer = '0';
    controlData = stateLight + stateBuzzer;
    set(controlRef, controlData)
    .then(() => {
      alert(`Dữ liệu unblock buzzer đã được gửi`);
    })
    .catch((error) => {
      alert("Lỗi khi gửi dữ liệu tại unblock buzzer:", error);
    });
  }
  else {
    document.getElementById('block-buzzer').textContent = "Unblock";
    isBlockBuzzer = true;
    stateBuzzer = '2';
    controlData = stateLight + stateBuzzer;

    set(controlRef, controlData)
    .then(() => {
      alert(`Dữ liệu block buzzer đã được gửi`);
    })
    .catch((error) => {
      alert("Lỗi khi gửi dữ liệu tại block buzzer:", error);
    });
  }
});

