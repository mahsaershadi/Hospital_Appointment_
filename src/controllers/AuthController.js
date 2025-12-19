import { AuthService } from '../services/AuthService.js';

export class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  login = async (req, res, next) => {
    try {
      const loginDto = req.body;
      const result = await this.authService.login(loginDto);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  register = async (req, res, next) => {
    try {
      const registerDto = req.body;
      const user = await this.authService.register(registerDto);

      res.status(201).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };
}

