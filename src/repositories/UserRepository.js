import { AppDataSource } from '../config/data-source.js';
import { User } from '../entities/User.js';

export class UserRepository {
  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async findByEmail(email) {
    return this.repository.findOne({ where: { email } });
  }

  async findById(id) {
    return this.repository.findOne({ where: { id } });
  }

  async create(user) {
    const newUser = this.repository.create(user);
    return this.repository.save(newUser);
  }

  async findAll() {
    return this.repository.find();
  }
}

