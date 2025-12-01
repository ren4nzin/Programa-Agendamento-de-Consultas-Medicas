const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const WorkingHourSchema = new Schema({
  dayOfWeek: Number,
  start: String,
  end: String
}, { _id: false });
const DoctorSchema = new Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  crm: { type: String },
  workingHours: { type: [WorkingHourSchema], default: [] },
  appointmentDurationMinutes: { type: Number, default: 30 }
}, { timestamps: true });
module.exports = mongoose.model('Doctor', DoctorSchema);
