const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
  timestamp: { type: Date, required: true },
  event: { type: String, required: true },
});

const activityLogModel = mongoose.model("activityLog", activityLogSchema);

module.exports = activityLogModel;
