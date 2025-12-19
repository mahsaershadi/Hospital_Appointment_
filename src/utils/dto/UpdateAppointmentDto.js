import 'reflect-metadata';
import {
  IsOptional,
  IsString,
  IsDateString,
  IsEnum,
} from 'class-validator';
import { AppointmentStatus } from '../../entities/Appointment.js';

export class UpdateAppointmentDto {
  @IsString()
  @IsOptional()
  patientId;

  @IsDateString()
  @IsOptional()
  scheduledAt;

  @IsEnum(AppointmentStatus)
  @IsOptional()
  status;

  @IsString()
  @IsOptional()
  description;
}

