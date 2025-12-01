const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  cpf: { type: String },
  phone: { type: String },
  birthDate: { type: Date },
  role: { type: String, enum: ['user','admin','doctor'], default: 'user' },
}, { timestamps: true });
module.exports = mongoose.model('User', UserSchema);
