const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const User = require('../models/User');

exports.stats = async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    const users = await User.countDocuments();
    const doctors = await Doctor.countDocuments();
    const apptsToday = await Appointment.countDocuments({ date: new Date().toISOString().slice(0,10), status: 'CONFIRMED' });
    res.json({ users, doctors, apptsToday });
  } catch (err) { res.status(500).json({ message: 'Server error' }) }
};

exports.listAllAppointments = async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    const appts = await Appointment.find().populate('userId').populate('doctorId');
    res.json(appts);
  } catch (err) { res.status(500).json({ message: 'Server error' }) }
};

exports.listDoctors = async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    const docs = await Doctor.find();
    res.json(docs);
  } catch (err) { res.status(500).json({ message: 'Server error' }) }
};

exports.updateDoctor = async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    const { id } = req.params;
    const d = await Doctor.findByIdAndUpdate(id, req.body, { new: true });
    res.json(d);
  } catch (err) { res.status(500).json({ message: 'Server error' }) }
};
