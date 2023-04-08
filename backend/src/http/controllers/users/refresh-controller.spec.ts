import req from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { mockUser } from '@/utils/test/mocks/mocks-users';

describe('Refresh Token (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it('should be able to refresh a token', async () => {
    await req(app.server).post('/users').send(mockUser);

    const authResponse = await req(app.server).post('/sessions').send({
      email: mockUser.email,
      password: mockUser.password,
    });

    const cookies = authResponse.get('Set-Cookie');

    const res = await req(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send();

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      }),
    );
    expect(res.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ]);
  });

  it('should not be able to authenticate with invalid credentials', async () => {
    await req(app.server).post('/users').send(mockUser);

    const res = await req(app.server).post('/sessions').send({
      email: mockUser.email,
      password: '123456788',
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual(
      expect.objectContaining({
        message: 'Invalid credentials.',
      }),
    );
  });
});
