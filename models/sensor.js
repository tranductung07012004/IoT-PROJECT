const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema({
  temp: {type: Number, required: true},
  humidity: {type: Number, required: true},
  photoresistor: 
  {
    timestamp: { type: Date, required: true }, // Thời gian cụ thể
    value: { type: Number, required: true },
  },
  
  gasSensor:
  {
    timestamp: { type: Date, required: true }, // Thời gian cụ thể
    value: { type: Number, required: true },
  },
  
  vibrationSensor: 
  {
    timestamp: { type: Date, required: true }, // Thời gian cụ thể
    value: { type: Number, required: true },
  },

}, { timestamps: true }); // Thêm thời gian tạo và cập nhật cho toàn bộ bản ghi

const sensorModel = mongoose.model("sensor", sensorSchema);

module.exports = sensorModel;

// thông số các sensor, temperature, humidity là 1 schema
// staff riêng 1 schema
// activityLog là 1 schema
// vehicle là 1 schema
