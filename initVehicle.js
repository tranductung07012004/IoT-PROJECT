const admin = require('firebase-admin');
const serviceAccount = require('./services/iot-project-383ff-firebase-adminsdk-vgmgx-be083cd490.json');

// Khởi tạo Firebase Admin
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://iot-project-383ff-default-rtdb.asia-southeast1.firebasedatabase.app/',
});

// Lấy tham chiếu đến node "license_plates"
const db = admin.database();
const ref = db.ref('/'); // tham chiếu đến node gốc

// Tạo node "license_plates"
const licensePlatesRef = ref.child('sensorData');

// Tạo dữ liệu mẫu
const records = [
    {
        image_url: 'https://example.com/image1.jpg',
        index: 1,
        time: new Date().toISOString(),
        in_out: true,
        license: 'ABC-1234'
    },
    {
        image_url: 'https://example.com/image2.jpg',
        index: 2,
        time: new Date().toISOString(),
        in_out: false,
        license: 'XYZ-5678'
    },
    {
        image_url: 'https://example.com/image3.jpg',
        index: 3,
        time: new Date().toISOString(),
        in_out: true,
        license: 'LMN-9012'
    },
    {
        image_url: 'https://example.com/image4.jpg',
        index: 4,
        time: new Date().toISOString(),
        in_out: false,
        license: 'DEF-3456'
    },
    {
        image_url: 'https://example.com/image5.jpg',
        index: 5,
        time: new Date().toISOString(),
        in_out: true,
        license: 'GHI-7890'
    }
];

// Ghi dữ liệu vào database
records.forEach((record, i) => {
  licensePlatesRef.push(record)
        .then(() => {
            console.log(`Bản ghi ${i + 1} đã được thêm thành công.`);
        })
        .catch((error) => {
            console.error(`Lỗi khi thêm bản ghi ${i + 1}:`, error);
        });
});
