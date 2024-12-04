const sensorModel = require('../models/sensor');

async function getSensorRecords() {
  try {
    // Truy vấn tất cả các dữ liệu cần thiết trong một lần và sắp xếp theo timestamp
    const records = await sensorModel.find({}, {
      photoresistor: 1,
      gasSensor: 1,
      vibrationSensor: 1
    }).sort({ 'timestamp': 1 }); // Sắp xếp theo timestamp chung (giả định timestamp có trong mỗi bản ghi)

    // Hàm định dạng lại dữ liệu theo yêu cầu
    const formatSensorData = (sensorData) => {
      return sensorData.map(data => {
        const timestamp = new Date(data.timestamp);
        const hour = timestamp.getUTCHours().toString().padStart(2, '0');
        const minute = timestamp.getUTCMinutes().toString().padStart(2, '0');
        return {
          timestamp: `${hour}:${minute}`,
          value: data.value,
        };
      });
    };

    // Lấy và định dạng các bản ghi từ các cảm biến, sắp xếp theo timestamp
    const photoresistorRecords = formatSensorData(
      records.flatMap(record => record.photoresistor).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)).slice(0, 7)
    );
    const gasSensorRecords = formatSensorData(
      records.flatMap(record => record.gasSensor).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)).slice(0, 7)
    );
    const vibrationSensorRecords = formatSensorData(
      records.flatMap(record => record.vibrationSensor).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)).slice(0, 7)
    );

    return {
      photoresistor: photoresistorRecords,
      gasSensor: gasSensorRecords,
      vibrationSensor: vibrationSensorRecords,
    };
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu từ cảm biến:', error);
    throw error;
  }
}

module.exports = getSensorRecords;



// async function getPhotoresistorRecords() {
//   try {
//     // Truy vấn 7 bản ghi gần nhất, sắp xếp theo thời gian tăng dần của photoresistor.timestamp
//     const records = await sensorModel
//       .find({}, { photoresistor: 1 }) // Chỉ lấy trường photoresistor
//       .sort({ 'photoresistor.timestamp': 1 }) // Sắp xếp theo timestamp trong photoresistor
//       .limit(7);

//     // Định dạng lại kết quả
//     const formattedRecords = records.map(record => {
//       const timestamp = record.photoresistor.timestamp;
//       //console.log(timestamp);
//       const hour = timestamp.getUTCHours().toString().padStart(2, '0');
//       const minute = timestamp.getUTCMinutes().toString().padStart(2, '0');
//       return {
//         timestamp: `${hour}:${minute}`,
//         value: record.photoresistor.value,
//       };
//     });
//     return formattedRecords;
//   } catch (error) {
//     console.error('Lỗi khi lấy bản ghi photoresistor:', error);
//     throw error;
//   }
// };

// async function getGasSensorRecords() {
//   try {
//     // Truy vấn 7 bản ghi gần nhất, sắp xếp theo thời gian tăng dần của 
//     const records = await sensorModel
//       .find({}, { gasSensor: 1 }) // Chỉ lấy trường 
//       .sort({ 'gasSensor.timestamp': 1 }) // Sắp xếp theo timestamp trong 
//       .limit(7);

//     // Định dạng lại kết quả
//     const formattedRecords = records.map(record => {
//       const timestamp = record.gasSensor.timestamp;
//       //console.log(timestamp);
//       const hour = timestamp.getUTCHours().toString().padStart(2, '0');
//       const minute = timestamp.getUTCMinutes().toString().padStart(2, '0');
//       return {
//         timestamp: `${hour}:${minute}`,
//         value: record.gasSensor.value,
//       };
//     });
//     return formattedRecords;
//   } catch (error) {
//     console.error('Lỗi khi lấy bản ghi gas sensor:', error);
//     throw error;
//   }
// };

// async function getVibrationSensorRecords() {
//   try {
//     // Truy vấn 7 bản ghi gần nhất, sắp xếp theo thời gian tăng dần của 
//     const records = await sensorModel
//       .find({}, { vibrationSensor: 1 }) // Chỉ lấy trường 
//       .sort({ 'vibrationSensor.timestamp': 1 }) // Sắp xếp theo timestamp trong 
//       .limit(7);

//     // Định dạng lại kết quả
//     const formattedRecords = records.map(record => {
//       const timestamp = record.vibrationSensor.timestamp;
//       const hour = timestamp.getUTCHours().toString().padStart(2, '0');
//       const minute = timestamp.getUTCMinutes().toString().padStart(2, '0');
//       return {
//         timestamp: `${hour}:${minute}`,
//         value: record.vibrationSensor.value,
//       };
//     });
//     return formattedRecords;
//   } catch (error) {
//     console.error('Lỗi khi lấy bản ghi vibration sensor:', error);
//     throw error;
//   }
// };

// const controller = {
//   getPhotoresistorRecords: getPhotoresistorRecords,
//   getGasSensorRecords: getGasSensorRecords,
//   getVibrationSensorRecords: getVibrationSensorRecords
// }

// module.exports = controller;


