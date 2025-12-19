import { PatientRepository } from '../repositories/PatientRepository.js';
import { NotFoundError, ConflictError } from '../utils/errors/AppError.js';

export class PatientService {
  constructor() {
    this.patientRepository = new PatientRepository();
  }

  async createPatient(createPatientDto) {
    const existingPatient = await this.patientRepository.findByNationalId(
      createPatientDto.nationalId
    );

    if (existingPatient) {
      throw new ConflictError('Patient with this national ID already exists');
    }

    const patient = await this.patientRepository.create({
      nationalId: createPatientDto.nationalId,
      firstName: createPatientDto.firstName,
      lastName: createPatientDto.lastName,
      dateOfBirth: new Date(createPatientDto.dateOfBirth),
      phone: createPatientDto.phone,
    });

    return patient;
  }

  async getAllPatients() {
    return this.patientRepository.findAll();
  }

  async getPatientById(id) {
    const patient = await this.patientRepository.findById(id);

    if (!patient) {
      throw new NotFoundError('Patient not found');
    }

    return patient;
  }

  async updatePatient(id, updatePatientDto) {
    const patient = await this.patientRepository.findById(id);

    if (!patient) {
      throw new NotFoundError('Patient not found');
    }

    if (updatePatientDto.nationalId) {
      const existingPatient = await this.patientRepository.findByNationalId(
        updatePatientDto.nationalId
      );

      if (existingPatient && existingPatient.id !== id) {
        throw new ConflictError('Patient with this national ID already exists');
      }
    }

    const updateData = {};
    if (updatePatientDto.nationalId) updateData.nationalId = updatePatientDto.nationalId;
    if (updatePatientDto.firstName) updateData.firstName = updatePatientDto.firstName;
    if (updatePatientDto.lastName) updateData.lastName = updatePatientDto.lastName;
    if (updatePatientDto.dateOfBirth) updateData.dateOfBirth = new Date(updatePatientDto.dateOfBirth);
    if (updatePatientDto.phone) updateData.phone = updatePatientDto.phone;

    return this.patientRepository.update(id, updateData);
  }

  async deletePatient(id) {
    const patient = await this.patientRepository.findById(id);

    if (!patient) {
      throw new NotFoundError('Patient not found');
    }

    await this.patientRepository.delete(id);
  }
}

