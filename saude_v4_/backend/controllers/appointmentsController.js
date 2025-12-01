const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
exports.createAppointment = async (req, res) => {
  try {
    const { doctorId, specialty, date, time } = req.body;
    if (!doctorId || !date || !time) return res.status(400).json({ message: 'Missing fields' });
    const doc = await Doctor.findById(doctorId);
    if (!doc) return res.status(404).json({ message: 'Doctor not found' });
    const exists = await Appointment.findOne({ doctorId, date, time, status: 'CONFIRMED' });
    if (exists) return res.status(409).json({ message: 'Slot already booked' });
    const appt = new Appointment({
      userId: req.user._id,
      userName: req.user.name,
      doctorId,
      doctorName: doc.name,
      specialty: specialty || doc.specialty,
      date,
      time,
      status: 'CONFIRMED'
    });
    await appt.save();
    res.json(appt);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.listUserAppointments = async (req, res) => {
  try {
    const appts = await Appointment.find({ userId: req.user._id });
    res.json(appts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appt = await Appointment.findById(id);
    if (!appt) return res.status(404).json({ message: 'Not found' });
    if (String(appt.userId) !== String(req.user._id) && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    appt.status = 'CANCELLED';
    await appt.save();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.rescheduleAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, time } = req.body;
    const appt = await Appointment.findById(id);
    if (!appt) return res.status(404).json({ message: 'Not found' });
    if (String(appt.userId) !== String(req.user._id) && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    const exists = await Appointment.findOne({ doctorId: appt.doctorId, date, time, status: 'CONFIRMED' });
    if (exists) return res.status(409).json({ message: 'Slot already booked' });
    appt.rescheduleHistory.push({ oldDate: appt.date, oldTime: appt.time, newDate: date, newTime: time, at: new Date() });
    appt.date = date;
    appt.time = time;
    appt.status = 'RESCHEDULED';
    await appt.save();
    res.json(appt);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
