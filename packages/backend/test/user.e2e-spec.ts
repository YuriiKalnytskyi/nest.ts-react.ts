import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';
import ERROR_MESSAGES_EN from '../src/module/common/errors/error-message/errors.en';
import ERROR_MESSAGES_UA from '../src/module/common/errors/error-message/errors.ua';
import { CredSignUserDTO } from '../src/module/user/dto';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  const userInfo: CredSignUserDTO = {
    password: '12345678',
    email: 'test@gmail.com',
    username: 'test'
  };
  let userRes = null;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    await app.init();
  }, 10000);

  it('create user', async () => {
    const user = await request(app.getHttpServer())
      .post('/user/sign-up/credentials')
      .send(userInfo);

    userRes = user.body;

    expect(userRes).toEqual({
      id: expect.any(String),
      token: expect.any(String)
    });
  });

  it('create user already exists', async () => {
    const user = await request(app.getHttpServer())
      .post('/user/sign-up/credentials')
      .send(userInfo);

    expect(user.body).toEqual({
      message: {
        en: ERROR_MESSAGES_EN.ALREADY_EXIST_USER,
        ua: ERROR_MESSAGES_UA.ALREADY_EXIST_USER
      }
    });
  });

  it('delete user by id', async () => {
    const res = await request(app.getHttpServer())
      .delete(`/user/delete-user/${userRes.id}`)
      .set({ Authorization: `Bearer ${userRes.token}` });

    expect(res.body).toEqual({
      id: expect.any(String)
    });
  });
});
