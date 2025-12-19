import 'reflect-metadata';
import { IsEmail, IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { UserRole } from '../../entities/User.js';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email;

  @IsString()
  @IsNotEmpty()
  password;

  @IsEnum(UserRole)
  @IsNotEmpty()
  role;
}

