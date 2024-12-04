const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shiftStart: { type: Date, required: true },
  shiftEnd: { type: Date, required: true },
});

const staffModel = mongoose.model("staff", staffSchema);

module.exports = staffModel;
