import 'reflect-metadata';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Patient } from './Patient.js';
import { User } from './User.js';

export const AppointmentStatus = {
  SCHEDULED: 'SCHEDULED',
  CANCELLED: 'CANCELLED',
  DONE: 'DONE',
};

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id;

  @Column({ name: 'patient_id' })
  patientId;

  @ManyToOne(() => Patient, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'patient_id' })
  patient;

  @Column({ name: 'scheduled_at', type: 'timestamp' })
  scheduledAt;

  @Column({
    type: 'enum',
    enum: AppointmentStatus,
    default: AppointmentStatus.SCHEDULED,
  })
  status;

  @Column({ type: 'text', nullable: true })
  description;

  @Column({ name: 'created_by' })
  createdBy;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'created_by' })
  user;

  @CreateDateColumn({ name: 'created_at' })
  createdAt;
}

