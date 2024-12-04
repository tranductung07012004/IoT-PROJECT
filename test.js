const mongoose = require('mongoose');
const Sensor = require('./models/sensor'); // Đảm bảo đường dẫn đúng đến mô hình của bạn

// Kết nối tới MongoDB
const URL = 'mongodb+srv://tdt:fc4zUmuESQER3b6H@iot-project.5vas7.mongodb.net/';
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));

// Hàm để tạo dữ liệu mẫu
async function createSampleData() {
  const sampleDataArray = [
    {
      temp: 25,
      humidity: 60,
      photoresistor: { timestamp: new Date('2024-12-06T17:00:00Z'), value: 130 },
      gasSensor: { timestamp: new Date('2024-12-06T15:05:00Z'), value: 30 },
      vibrationSensor: { timestamp: new Date('2024-12-06T10:10:00Z'), value: 5 },
    },
    {
      temp: 26,
      humidity: 65,
      photoresistor: { timestamp: new Date('2024-12-06T16:00:00Z'), value: 120 },
      gasSensor: { timestamp: new Date('2024-12-06T16:05:00Z'), value: 40 },
      vibrationSensor: { timestamp: new Date('2024-12-06T11:10:00Z'), value: 6 },
    },
    {
      temp: 24,
      humidity: 58,
      photoresistor: { timestamp: new Date('2024-12-06T15:00:00Z'), value: 110 },
      gasSensor: { timestamp: new Date('2024-12-06T17:05:00Z'), value: 35 },
      vibrationSensor: { timestamp: new Date('2024-12-06T12:10:00Z'), value: 4 },
    },
    {
      temp: 27,
      humidity: 70,
      photoresistor: { timestamp: new Date('2024-12-06T14:00:00Z'), value: 100 },
      gasSensor: { timestamp: new Date('2024-12-06T18:05:00Z'), value: 50 },
      vibrationSensor: { timestamp: new Date('2024-12-06T13:10:00Z'), value: 7 },
    },
    {
      temp: 23,
      humidity: 55,
      photoresistor: { timestamp: new Date('2024-12-06T13:00:00Z'), value: 90 },
      gasSensor: { timestamp: new Date('2024-12-06T19:05:00Z'), value: 25 },
      vibrationSensor: { timestamp: new Date('2024-12-06T14:10:00Z'), value: 3 },
    },
  ];

  try {
    // Lặp qua mỗi phần tử và lưu vào cơ sở dữ liệu
    for (const data of sampleDataArray) {
      const newRecord = new Sensor(data);
      await newRecord.save();
    }
    console.log('5 bản ghi đã được tạo thành công');
  } catch (error) {
    console.error('Lỗi khi tạo bản ghi:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Gọi hàm để tạo dữ liệu mẫu
createSampleData();
