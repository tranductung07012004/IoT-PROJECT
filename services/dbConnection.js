const mongoose = require('mongoose');

const URL = 'mongodb+srv://tdt:fc4zUmuESQER3b6H@iot-project.5vas7.mongodb.net/';

async function connectDatabase() {
  try {
      await mongoose.connect(URL);
      console.log('Connect database success');
  } catch (error) {  
      console.log('Connect database fail: ', error);
  }
   // Bắt sự kiện ngắt kết nối
   mongoose.connection.on('disconnected', () => {
    console.error('MongoDB disconnected!');
  });
}

module.exports = connectDatabase;

