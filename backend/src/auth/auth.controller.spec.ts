import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('AuthController', () => {
  let app: INestApplication;
  const authService = { signUp: () => ['test'], signIn: () => ['test'] };

  beforeAll(async () => {
    const AuthModule: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
    .overrideProvider(AuthService)
    .useValue(authService)
    .compile();

    app = AuthModule.createNestApplication();
    await app.init();
  });

  it('/POST signup', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({username: 'test', password: 'test'})
      .expect(201);
  });

  it('/POST signin', () => {
    return request(app.getHttpServer())
      .post('/auth/signin')
      .send({username: 'test', password: 'test'})
      .expect(201);
  });

  afterAll(async () => {
    await app.close();
  });
});