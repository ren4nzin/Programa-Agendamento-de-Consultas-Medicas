const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AppointmentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String },
  doctorId: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
  doctorName: { type: String },
  specialty: { type: String },
  date: { type: String },
  time: { type: String },
  status: { type: String, enum: ['CONFIRMED','CANCELLED','RESCHEDULED','PENDING'], default: 'CONFIRMED' },
  rescheduleHistory: { type: Array, default: [] }
}, { timestamps: true });
module.exports = mongoose.model('Appointment', AppointmentSchema);
