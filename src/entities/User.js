import 'reflect-metadata';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Appointment } from './Appointment.js';

export const UserRole = {
  ADMIN: 'ADMIN',
  STAFF: 'STAFF',
};

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id;

  @Column({ unique: true })
  email;

  @Column({ name: 'password_hash' })
  passwordHash;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.STAFF,
  })
  role;

  @CreateDateColumn({ name: 'created_at' })
  createdAt;

  @OneToMany(() => Appointment, (appointment) => appointment.createdBy)
  appointments;
}

