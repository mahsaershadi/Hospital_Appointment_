import { Router } from 'express';
import { AuthController } from '../controllers/AuthController.js';
import { validateRequest } from '../middlewares/validation.js';
import { LoginDto } from '../utils/dto/LoginDto.js';
import { RegisterDto } from '../utils/dto/RegisterDto.js';
import { authenticate, authorize } from '../middlewares/auth.js';
import { UserRole } from '../entities/User.js';

const router = Router();
const authController = new AuthController();

router.post('/login', validateRequest(LoginDto), authController.login);

router.post(
  '/register',
  authenticate,
  authorize(UserRole.ADMIN),
  validateRequest(RegisterDto),
  authController.register
);

export default router;

