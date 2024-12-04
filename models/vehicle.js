const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  licencePlate: { type: String, required: true },
  imageUrl: { type: String, required: true },
  entryTime: { type: Date, required: true }, // Thời gian vào
  exitTime: { type: Date }, // Có thể rỗng nếu xe chưa ra
}, { timestamps: true });

const vehicleModel = mongoose.model("vehicle", vehicleSchema);

module.exports = vehicleModel;
