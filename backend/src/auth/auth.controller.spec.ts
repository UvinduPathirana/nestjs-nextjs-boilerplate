import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService; 

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, JwtService, { provide: UserRepository, useValue: mockDataSource }],
    }).compile();


    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  })

  const mockDataSource = {
    // Add methods and properties as required by UserRepository
    findOne: jest.fn(),
    createUser: jest.fn(),
  };

  describe('signUp', () => {
    it('should successfully sign up a user', async () => {
      const result = { message: 'User created successfully'};
      jest.spyOn(authService, 'signUp').mockImplementation(() => Promise.resolve(result));

      expect(await authController.signUp(new AuthCredentialsDto())).toBe(result);
    })
  })

  describe('signIn', () => {
    it('should succesfully sign in a user', async () => {
      const result = {accessToken: 'token'};
      jest.spyOn(authService, 'signIn').mockImplementation(() => Promise.resolve(result));

      expect(await authController.signIn(new AuthCredentialsDto())).toBe(result);
    })
  })
})