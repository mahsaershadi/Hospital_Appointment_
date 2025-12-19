import 'reflect-metadata';
import {
  IsNotEmpty,
  IsString,
  IsDateString,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { AppointmentStatus } from '../../entities/Appointment.js';

export class CreateAppointmentDto {
  @IsString()
  @IsNotEmpty()
  patientId;

  @IsDateString()
  @IsNotEmpty()
  scheduledAt;

  @IsEnum(AppointmentStatus)
  @IsOptional()
  status;

  @IsString()
  @IsOptional()
  description;
}

