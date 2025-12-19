import { Router } from 'express';
import { AppointmentController } from '../controllers/AppointmentController.js';
import { validateRequest } from '../middlewares/validation.js';
import { CreateAppointmentDto } from '../utils/dto/CreateAppointmentDto.js';
import { UpdateAppointmentDto } from '../utils/dto/UpdateAppointmentDto.js';
import { authenticate } from '../middlewares/auth.js';

const router = Router();
const appointmentController = new AppointmentController();

router.use(authenticate);

router.post('/', validateRequest(CreateAppointmentDto), appointmentController.createAppointment);
router.get('/', appointmentController.getAllAppointments);
router.get('/:id', appointmentController.getAppointmentById);
router.put('/:id', validateRequest(UpdateAppointmentDto), appointmentController.updateAppointment);
router.delete('/:id', appointmentController.deleteAppointment);

export default router;

