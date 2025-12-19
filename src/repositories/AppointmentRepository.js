import { AppDataSource } from '../config/data-source.js';
import { Appointment } from '../entities/Appointment.js';

export class AppointmentRepository {
  constructor() {
    this.repository = AppDataSource.getRepository(Appointment);
  }

  async findById(id) {
    return this.repository.findOne({
      where: { id },
      relations: ['patient', 'user'],
    });
  }

  async findAll() {
    return this.repository.find({
      relations: ['patient', 'user'],
      order: { scheduledAt: 'ASC' },
    });
  }

  async findByPatientId(patientId) {
    return this.repository.find({
      where: { patientId },
      relations: ['patient', 'user'],
      order: { scheduledAt: 'ASC' },
    });
  }

  async create(appointment) {
    const newAppointment = this.repository.create(appointment);
    return this.repository.save(newAppointment);
  }

  async update(id, appointment) {
    await this.repository.update(id, appointment);
    const updated = await this.findById(id);
    if (!updated) {
      throw new Error('Appointment not found after update');
    }
    return updated;
  }

  async delete(id) {
    await this.repository.delete(id);
  }
}

