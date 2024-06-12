import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
}));

jest.mock('@nestjs/jwt', () => ({
  JwtService: jest.fn(() => ({
    sign: jest.fn(),
  })),
}));

// Mock DataSource
const mockDataSource = {
  // Add methods and properties as required by UserRepository
  findOne: jest.fn(),
  createUser: jest.fn(),
};

describe('AuthService', () => {
  let authService;
  let userRepository;
  let jwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, JwtService, { provide: UserRepository, useValue: mockDataSource }],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userRepository = module.get<UserRepository>(UserRepository);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('signUp', () => {
    it('should successfully sign up a user', async () => {
      userRepository.createUser.mockResolvedValue('User created successfully');
      expect(await authService.signUp({ email: 'uvindu@gmail.com', password: 'Uvindu@1'})).toEqual('User created successfully');
    });
  });

  describe('signIn', () => {
    it('should validate a user sign in', async () => {
      userRepository.findOne.mockResolvedValue({email: 'test@test.com', password: 'testPassword'});
      bcrypt.compare.mockResolvedValue(true);
      jwtService.sign.mockResolvedValue('testToken');

      const result = await authService.signIn({email: 'test@test.com', password: 'testPassword'});
      expect(result).toEqual({ accessToken: Promise.resolve('testToken') });
    });

    it('should throw an error as user is unauthorized', async () => {
      userRepository.findOne.mockResolvedValue(null);
      expect(authService.signIn({email: 'test@test.com', password: 'testPassword'})).rejects.toThrow(UnauthorizedException);
    });
  });
});

