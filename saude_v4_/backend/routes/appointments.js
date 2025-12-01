const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const appointmentsController = require('../controllers/appointmentsController');
router.post('/', auth, appointmentsController.createAppointment);
router.get('/', auth, appointmentsController.listUserAppointments);
router.delete('/:id', auth, appointmentsController.cancelAppointment);
router.put('/:id/reschedule', auth, appointmentsController.rescheduleAppointment);
module.exports = router;
