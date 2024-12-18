const admin = require('firebase-admin');

// Hàm lấy dữ liệu từ node `license_plates` với điều kiện `index lớn nhất` cho cả vehicle-in và vehicle-out
const getDefaultLicensePlate = async (req, res) => {
  try {
    //console.log(index);
    const db = admin.database();
    const licensePlatesRef = db.ref('license_plates'); // Tham chiếu đến node `license_plates`

    let snapshot;

    // Lấy tất cả các bản ghi để lọc
    snapshot = await licensePlatesRef.once('value');
    

    if (!snapshot.exists()) {
      return res.render('controlPanel', {
        message: 'No license plate found.',
        status: 404,
      });
    }

    const data = snapshot.val();

    // Chuyển dữ liệu từ Firebase thành array object
    const records = Object.keys(data).map((key) => ({ id: key, ...data[key] }));

    // Lọc các bản ghi có `in_out = true`
    const vehicle_in = records.filter((record) => record.in_out === true);
    const vehicle_out = records.filter((record) => record.in_out === false);

    if (vehicle_in.length === 0) {
      return res.render('controlPanel', {
        message: 'No license plate found with in_out = true.',
        status: 404,
      });
    }
    else if (vehicle_out.length === 0) {
      return res.render('controlPanel', {
        message: 'No license plate found with in_out = false.',
        status: 404,
      });
    }

    // Lấy bản ghi có `index` lớn nhất từ các bản ghi thỏa mãn `in_out = true`
    const result_in = vehicle_in.reduce((maxRecord, record) =>
      record.index > maxRecord.index ? record : maxRecord
    );
    const result_out = vehicle_out.reduce((maxRecord, record) => 
      record.index >  maxRecord.index ? record: maxRecord
    );

    // Trả về dữ liệu hoặc render
    res.render('controlPanel', {
       result_in, 
       result_out,
    });
  } catch (error) {
    console.error('Error fetching license plate:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

const getLicensePlateByIndex = async (req, res) => {
  try {
    const { index, in_out, arrow } = req.params; // Lấy index từ req.params

    const db = admin.database();
    const licensePlatesRef = db.ref('license_plates');

    if (!index || !in_out || !arrow) {
      // Nếu không có index, trả về thông báo lỗi
      return res.status(400).json({ message: 'Index or in_out is not sent to server.' });
    }

    // Lấy tất cả các bản ghi 
    let snapshot = await licensePlatesRef.once('value');
    

    if (!snapshot.exists()) {
      // Nếu không tìm thấy bản ghi nào
      return res.status(404).json({ message: 'No data available on database.' });
    }

    // Chuyển dữ liệu từ snapshot thành object
    
    const data = snapshot.val();
    if (!data) {
      return res.status(404).json({ message: 'No records found' });
    }
   

    const records = Object.values(data);

    const isInOutTrue = in_out === '1'; // Kiểm tra nếu 1 thì là vehicle in, 0 là vehicle out
    const targetIndex = parseInt(index);
    const prevOrNext = arrow === '1'; // Kiểm tra nếu là 1 thì là next, nếu là 0 thì previous

    const filteredRecords = records.filter(record => record.in_out === isInOutTrue); // Lọc ra vehicle out hoặc vehicle in dựa vào isInOutTrue
    //console.log(filteredRecords);
    // console.log(targetIndex);
    // Xử lý logic theo in_out
    let closestRecord = null;

    if (prevOrNext) {
      // Trường hợp in_out = true: Tìm index lớn hơn và gần nhất
      for (let i = 0; i < filteredRecords.length; i++) {
        const record = filteredRecords[i];
        if (record.index > targetIndex) {  // Lọc index lớn hơn targetIndex
          closestRecord = record;
          break;
        }
      }

    } else {
      // Trường hợp in_out = false: Tìm index nhỏ hơn và gần nhất
      
      for (let i = 0; i < filteredRecords.length; i++) {
        const record = filteredRecords[i];
        if (record.index < targetIndex) {  // Lọc index lớn hơn targetIndex
          closestRecord = record;
        }
        else break;
      }
    }

    if (!closestRecord) {
      return res.status(404).json({ message: 'No matching records found' });
    }

    return res.status(200).json(closestRecord);
  } catch (error) {
    console.error('Error fetching license plate:', error);
    // Trả về lỗi
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

const getLatestLicensePlate = async (req, res) => {
  try {
    //console.log(index);
    const { in_out } = req.params;
    const isInOutTrue = in_out === '1'; // Kiểm tra nếu 1 thì là vehicle in, 0 là vehicle out

    const db = admin.database();
    const licensePlatesRef = db.ref('license_plates'); // Tham chiếu đến node `license_plates`

    let snapshot;

    // Lấy tất cả các bản ghi để lọc
    snapshot = await licensePlatesRef.once('value');
    

    if (!snapshot.exists()) {
      return res.render('controlPanel', {
        message: 'No license plate found.',
        status: 404,
      });
    }

    const data = snapshot.val();

    // Chuyển dữ liệu từ Firebase thành array object
    const records = Object.values(data);

    // Lọc các bản ghi có `in_out = true`
    let vehicle = records.filter((record) => record.in_out === isInOutTrue);
   

    if (vehicle.length === 0) {
      return res.render('controlPanel', {
        message: 'No license plate found with in_out = true.',
        status: 404,
      });
    }

    // Lấy bản ghi có `index` lớn nhất từ các bản ghi thỏa mãn `in_out = true`
    const result = vehicle.reduce((maxRecord, record) =>
      record.index > maxRecord.index ? record : maxRecord
    );

    if (!result) {
      return res.status(404).json({ message: 'No matching records found' });
    }
    // Trả về dữ liệu hoặc render
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching license plate:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

const getSensorData = async (req, res) => {
  try {
    const db = admin.database();
    const ref = db.ref('sensorData'); // Tham chiếu đến node `sensorData`

    // Đọc dữ liệu từ Firebase
    ref.once('value', (snapshot) => {
      const data = snapshot.val();

      if (!data) {
        return res.status(404).json({ message: 'No sensor data found.' });
      }

      // Dữ liệu có thể trả về bao gồm cả thời gian (key)
      const result = Object.entries(data).map(([time, values]) => ({
        time,
        ...values,
      }));

      const latestRecords = result.slice(-6);

      const {humidity, temperature} = latestRecords[latestRecords.length - 1];

      // Mảng con 1: chỉ chứa `time` và `light`
      const lightArray = latestRecords.map(({ time, light }) => ({
        time,
        light,
      }));

      // Mảng con 2: chỉ chứa `time` và `mq2`
      const mq2Array = latestRecords.map(({ time, mq2 }) => ({
        time,
        mq2,
      }));

      // Mảng con 3: chỉ chứa `time` và `vibration`
      const vibrationArray = latestRecords.map(({ time, vibration }) => ({
        time,
        vibration,
      }));

      // Gom ba mảng thành một object
      const responseObject = {
        photoresistor: lightArray,
        gasSensor: mq2Array,
        vibrationSensor: vibrationArray,
        humid: humidity,
        temp: temperature,
      };


      res.status(200).json(responseObject);
    });
  } catch (error) {
    console.error('Error fetching sensor data:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};


module.exports = {
  getDefaultLicensePlate,
  getLicensePlateByIndex,
  getLatestLicensePlate,
  getSensorData,
};
