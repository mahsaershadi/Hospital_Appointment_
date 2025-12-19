import 'reflect-metadata';
import bcrypt from 'bcryptjs';
import { AppDataSource } from '../config/data-source.js';
import { User } from '../entities/User.js';
import { UserRole } from '../entities/User.js';

const createAdmin = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database connected');

    const email = process.argv[2] || 'admin@hospital.com';
    const password = process.argv[3] || 'admin123';

    const userRepository = AppDataSource.getRepository(User);

    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
      console.log(`User with email ${email} already exists`);
      process.exit(0);
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const admin = userRepository.create({
      email,
      passwordHash,
      role: UserRole.ADMIN,
    });

    await userRepository.save(admin);
    console.log(`Admin user created successfully:`);
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    console.log(`Role: ADMIN`);

    await AppDataSource.destroy();
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
};

createAdmin();

