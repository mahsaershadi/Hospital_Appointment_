import { Router } from 'express';
import { PatientController } from '../controllers/PatientController.js';
import { validateRequest } from '../middlewares/validation.js';
import { CreatePatientDto } from '../utils/dto/CreatePatientDto.js';
import { UpdatePatientDto } from '../utils/dto/UpdatePatientDto.js';
import { authenticate } from '../middlewares/auth.js';

const router = Router();
const patientController = new PatientController();

router.use(authenticate);

router.post('/', validateRequest(CreatePatientDto), patientController.createPatient);
router.get('/', patientController.getAllPatients);
router.get('/:id', patientController.getPatientById);
router.put('/:id', validateRequest(UpdatePatientDto), patientController.updatePatient);
router.delete('/:id', patientController.deletePatient);

export default router;

