import 'reflect-metadata';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { BadRequestError } from '../utils/errors/AppError.js';

export const validateRequest = (dtoClass) => {
  return async (req, _res, next) => {
    const dto = plainToInstance(dtoClass, req.body);
    const errors = await validate(dto);

    if (errors.length > 0) {
      const errorMessages = errors.map((error) => {
        return Object.values(error.constraints || {}).join(', ');
      });

      return next(new BadRequestError(errorMessages.join('; ')));
    }

    req.body = dto;
    next();
  };
};

