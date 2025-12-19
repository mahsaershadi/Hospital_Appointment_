import 'reflect-metadata';
import {
  IsNotEmpty,
  IsString,
  IsDateString,
  Matches,
} from 'class-validator';

export class CreatePatientDto {
  @IsString()
  @IsNotEmpty()
  nationalId;

  @IsString()
  @IsNotEmpty()
  firstName;

  @IsString()
  @IsNotEmpty()
  lastName;

  @IsDateString()
  @IsNotEmpty()
  dateOfBirth;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/, {
    message: 'Invalid phone number format',
  })
  phone;
}

