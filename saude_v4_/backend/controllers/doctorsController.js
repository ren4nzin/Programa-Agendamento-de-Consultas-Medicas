const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');
exports.getSpecialties = async (req, res) => {
  const specialties = await Doctor.find().distinct('specialty');
  res.json(specialties);
};
exports.listDoctors = async (req, res) => {
  const { specialty } = req.query;
  const filter = specialty ? { specialty } : {};
  const docs = await Doctor.find(filter);
  res.json(docs);
};
function generateSlotsForDay(workingHours, durationMinutes) {
  const slots = {};
  workingHours.forEach(wh => {
    const arr = [];
    const [sh, sm] = wh.start.split(':').map(Number);
    const [eh, em] = wh.end.split(':').map(Number);
    let curMin = sh*60 + sm;
    const endMin = eh*60 + em;
    while (curMin + durationMinutes <= endMin) {
      const hh = String(Math.floor(curMin/60)).padStart(2,'0');
      const mm = String(curMin%60).padStart(2,'0');
      arr.push(hh + ':' + mm);
      curMin += durationMinutes;
    }
    slots[wh.dayOfWeek] = (slots[wh.dayOfWeek] || []).concat(arr);
  });
  return slots;
}
exports.getAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const { date } = req.query;
    if (!date) return res.status(400).json({ message: 'date query required (YYYY-MM-DD)' });
    const doc = await Doctor.findById(id);
    if (!doc) return res.status(404).json({ message: 'Doctor not found' });
    const day = new Date(date + 'T00:00:00').getDay();
    const duration = doc.appointmentDurationMinutes || 30;
    const slotsByDay = generateSlotsForDay(doc.workingHours, duration);
    const slots = slotsByDay[day] || [];
    const appts = await Appointment.find({ doctorId: doc._id, date, status: 'CONFIRMED' });
    const booked = appts.map(a => a.time);
    const available = slots.filter(s => !booked.includes(s));
    res.json({ date, available });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.createDoctor = async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    const { name, specialty, crm, workingHours, appointmentDurationMinutes } = req.body;
    const d = new Doctor({ name, specialty, crm, workingHours, appointmentDurationMinutes });
    await d.save();
    res.json(d);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.updateDoctor = async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    const { id } = req.params;
    const data = req.body;
    const d = await Doctor.findByIdAndUpdate(id, data, { new: true });
    res.json(d);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
