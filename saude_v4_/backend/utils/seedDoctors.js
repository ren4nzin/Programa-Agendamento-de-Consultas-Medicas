const Doctor = require('../models/Doctor');
async function seed() {
  const count = await Doctor.countDocuments();
  if (count === 0) {
    await Doctor.create([
      { name: 'Dr. João Silva', specialty: 'Cardiologia', crm: '12345', workingHours: [{dayOfWeek:1,start:'08:00',end:'12:00'},{dayOfWeek:1,start:'13:00',end:'17:00'},{dayOfWeek:2,start:'08:00',end:'12:00'},{dayOfWeek:3,start:'08:00',end:'12:00'},{dayOfWeek:4,start:'13:00',end:'17:00'}], appointmentDurationMinutes:30 },
      { name: 'Dra. Maria Costa', specialty: 'Pediatria', crm: '54321', workingHours: [{dayOfWeek:1,start:'08:00',end:'12:00'},{dayOfWeek:3,start:'08:00',end:'12:00'}], appointmentDurationMinutes:20 },
      { name: 'Dr. Pedro Alves', specialty: 'Dermatologia', crm: '99999', workingHours: [{dayOfWeek:2,start:'08:00',end:'12:00'},{dayOfWeek:4,start:'08:00',end:'12:00'}], appointmentDurationMinutes:30 }
    ]);
    console.log('Seeded doctors');
  } else {
    console.log('Doctors already seeded');
  }
}
module.exports = seed;
