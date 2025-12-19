import { PatientService } from '../services/PatientService.js';

export class PatientController {
  constructor() {
    this.patientService = new PatientService();
  }

  createPatient = async (req, res, next) => {
    try {
      const createPatientDto = req.body;
      const patient = await this.patientService.createPatient(createPatientDto);

      res.status(201).json({
        success: true,
        data: patient,
      });
    } catch (error) {
      next(error);
    }
  };

  getAllPatients = async (_req, res, next) => {
    try {
      const patients = await this.patientService.getAllPatients();

      res.status(200).json({
        success: true,
        data: patients,
      });
    } catch (error) {
      next(error);
    }
  };

  getPatientById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const patient = await this.patientService.getPatientById(id);

      res.status(200).json({
        success: true,
        data: patient,
      });
    } catch (error) {
      next(error);
    }
  };

  updatePatient = async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatePatientDto = req.body;
      const patient = await this.patientService.updatePatient(id, updatePatientDto);

      res.status(200).json({
        success: true,
        data: patient,
      });
    } catch (error) {
      next(error);
    }
  };

  deletePatient = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.patientService.deletePatient(id);

      res.status(200).json({
        success: true,
        message: 'Patient deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };
}

