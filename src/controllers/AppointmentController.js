import { AppointmentService } from '../services/AppointmentService.js';

export class AppointmentController {
  constructor() {
    this.appointmentService = new AppointmentService();
  }

  createAppointment = async (req, res, next) => {
    try {
      const createAppointmentDto = req.body;
      if (!req.user) {
        throw new Error('User not authenticated');
      }
      const appointment = await this.appointmentService.createAppointment(
        createAppointmentDto,
        req.user.userId
      );

      res.status(201).json({
        success: true,
        data: appointment,
      });
    } catch (error) {
      next(error);
    }
  };

  getAllAppointments = async (_req, res, next) => {
    try {
      const appointments = await this.appointmentService.getAllAppointments();

      res.status(200).json({
        success: true,
        data: appointments,
      });
    } catch (error) {
      next(error);
    }
  };

  getAppointmentById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const appointment = await this.appointmentService.getAppointmentById(id);

      res.status(200).json({
        success: true,
        data: appointment,
      });
    } catch (error) {
      next(error);
    }
  };

  updateAppointment = async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateAppointmentDto = req.body;
      const appointment = await this.appointmentService.updateAppointment(
        id,
        updateAppointmentDto
      );

      res.status(200).json({
        success: true,
        data: appointment,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteAppointment = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.appointmentService.deleteAppointment(id);

      res.status(200).json({
        success: true,
        message: 'Appointment deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };
}

