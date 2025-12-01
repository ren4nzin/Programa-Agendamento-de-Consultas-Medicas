const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = async function createAdmin(){
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@admin.com';
    const adminPass = process.env.ADMIN_PASSWORD || 'admin';
    const exists = await User.findOne({ email: adminEmail });
    if (!exists) {
      const hash = await bcrypt.hash(adminPass, 10);
      const admin = new User({
        name: 'Administrator',
        email: adminEmail,
        passwordHash: hash,
        cpf: '',
        phone: '',
        birthDate: new Date(),
        role: 'admin'
      });
      await admin.save();
      console.log('Admin user created:', adminEmail);
    } else {
      console.log('Admin already exists');
    }
  } catch (err) {
    console.error('Error creating admin:', err.message);
  }
};
