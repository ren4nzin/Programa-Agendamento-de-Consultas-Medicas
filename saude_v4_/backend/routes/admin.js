const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const AdminController = require('../controllers/adminController');
router.get('/stats', auth, AdminController.stats);
router.get('/appointments', auth, AdminController.listAllAppointments);
router.get('/doctors', auth, AdminController.listDoctors);
router.put('/doctor/:id', auth, AdminController.updateDoctor);
module.exports = router;
