import bcrypt from 'bcryptjs';
import { UserRepository } from '../repositories/UserRepository.js';
import { UserRole } from '../entities/User.js';
import { generateToken } from '../utils/jwt.js';
import {
  UnauthorizedError,
  ConflictError,
  BadRequestError,
} from '../utils/errors/AppError.js';

export class AuthService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async login(loginDto) {
    const user = await this.userRepository.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.passwordHash);

    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }

  async register(registerDto) {
    if (registerDto.role === UserRole.ADMIN) {
      throw new BadRequestError('Cannot create admin user through registration');
    }

    const existingUser = await this.userRepository.findByEmail(registerDto.email);

    if (existingUser) {
      throw new ConflictError('User with this email already exists');
    }

    const passwordHash = await bcrypt.hash(registerDto.password, 10);

    const user = await this.userRepository.create({
      email: registerDto.email,
      passwordHash,
      role: registerDto.role,
    });

    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }
}

