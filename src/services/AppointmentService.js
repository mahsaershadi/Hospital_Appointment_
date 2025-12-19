import { AppointmentRepository } from '../repositories/AppointmentRepository.js';
import { PatientRepository } from '../repositories/PatientRepository.js';
import { NotFoundError, BadRequestError } from '../utils/errors/AppError.js';
import { AppointmentStatus } from '../entities/Appointment.js';

export class AppointmentService {
  constructor() {
    this.appointmentRepository = new AppointmentRepository();
    this.patientRepository = new PatientRepository();
  }

  async createAppointment(createAppointmentDto, createdBy) {
    const patient = await this.patientRepository.findById(createAppointmentDto.patientId);

    if (!patient) {
      throw new NotFoundError('Patient not found');
    }

    const scheduledAt = new Date(createAppointmentDto.scheduledAt);
    if (scheduledAt < new Date()) {
      throw new BadRequestError('Cannot schedule appointment in the past');
    }

    const appointment = await this.appointmentRepository.create({
      patientId: createAppointmentDto.patientId,
      scheduledAt,
      status: createAppointmentDto.status || AppointmentStatus.SCHEDULED,
      description: createAppointmentDto.description || null,
      createdBy,
    });

    return this.appointmentRepository.findById(appointment.id);
  }

  async getAllAppointments() {
    return this.appointmentRepository.findAll();
  }

  async getAppointmentById(id) {
    const appointment = await this.appointmentRepository.findById(id);

    if (!appointment) {
      throw new NotFoundError('Appointment not found');
    }

    return appointment;
  }

  async updateAppointment(id, updateAppointmentDto) {
    const appointment = await this.appointmentRepository.findById(id);

    if (!appointment) {
      throw new NotFoundError('Appointment not found');
    }

    if (updateAppointmentDto.patientId) {
      const patient = await this.patientRepository.findById(updateAppointmentDto.patientId);

      if (!patient) {
        throw new NotFoundError('Patient not found');
      }
    }

    if (updateAppointmentDto.scheduledAt) {
      const scheduledAt = new Date(updateAppointmentDto.scheduledAt);
      if (scheduledAt < new Date() && appointment.status !== AppointmentStatus.CANCELLED) {
        throw new BadRequestError('Cannot schedule appointment in the past');
      }
    }

    const updateData = {};
    if (updateAppointmentDto.patientId) updateData.patientId = updateAppointmentDto.patientId;
    if (updateAppointmentDto.scheduledAt) updateData.scheduledAt = new Date(updateAppointmentDto.scheduledAt);
    if (updateAppointmentDto.status) updateData.status = updateAppointmentDto.status;
    if (updateAppointmentDto.description !== undefined) updateData.description = updateAppointmentDto.description;

    return this.appointmentRepository.update(id, updateData);
  }

  async deleteAppointment(id) {
    const appointment = await this.appointmentRepository.findById(id);

    if (!appointment) {
      throw new NotFoundError('Appointment not found');
    }

    await this.appointmentRepository.delete(id);
  }
}

