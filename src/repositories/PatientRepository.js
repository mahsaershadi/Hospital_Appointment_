import { AppDataSource } from '../config/data-source.js';
import { Patient } from '../entities/Patient.js';

export class PatientRepository {
  constructor() {
    this.repository = AppDataSource.getRepository(Patient);
  }

  async findById(id) {
    return this.repository.findOne({ where: { id } });
  }

  async findByNationalId(nationalId) {
    return this.repository.findOne({ where: { nationalId } });
  }

  async findAll() {
    return this.repository.find({ order: { createdAt: 'DESC' } });
  }

  async create(patient) {
    const newPatient = this.repository.create(patient);
    return this.repository.save(newPatient);
  }

  async update(id, patient) {
    await this.repository.update(id, patient);
    const updated = await this.findById(id);
    if (!updated) {
      throw new Error('Patient not found after update');
    }
    return updated;
  }

  async delete(id) {
    await this.repository.delete(id);
  }
}

