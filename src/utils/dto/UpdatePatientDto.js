import 'reflect-metadata';
import {
  IsOptional,
  IsString,
  IsDateString,
  Matches,
} from 'class-validator';

export class UpdatePatientDto {
  @IsString()
  @IsOptional()
  nationalId;

  @IsString()
  @IsOptional()
  firstName;

  @IsString()
  @IsOptional()
  lastName;

  @IsDateString()
  @IsOptional()
  dateOfBirth;

  @IsString()
  @IsOptional()
  @Matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/, {
    message: 'Invalid phone number format',
  })
  phone;
}

