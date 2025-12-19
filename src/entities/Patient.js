import 'reflect-metadata';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Appointment } from './Appointment.js';

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id;

  @Column({ name: 'national_id', unique: true })
  nationalId;

  @Column({ name: 'first_name' })
  firstName;

  @Column({ name: 'last_name' })
  lastName;

  @Column({ name: 'date_of_birth', type: 'date' })
  dateOfBirth;

  @Column()
  phone;

  @CreateDateColumn({ name: 'created_at' })
  createdAt;

  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  appointments;
}

