require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();


app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
const authRoutes = require('./routes/auth');
const doctorRoutes = require('./routes/doctors');
const appointmentRoutes = require('./routes/appointments');

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);

const PORT = process.env.PORT || 4000;
const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/saude_demo';

mongoose.connect(MONGO)
  .then(async () => {
    console.log('MongoDB connected');
    const createAdmin = require('./utils/createAdmin');
    await createAdmin();
    const seedDoctors = require('./utils/seedDoctors');
    await seedDoctors();
    app.listen(PORT, () => console.log('Server running on port', PORT));
  })
  .catch(err => console.error('MongoDB connection error', err));
