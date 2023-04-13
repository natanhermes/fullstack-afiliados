import req from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { mockUser } from '@/utils/test/mocks/mocks-users';

describe('Create User (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it('should be able to create user', async () => {
    const res = await req(app.server).post('/users').send(mockUser);

    expect(res.statusCode).toEqual(201);
  });

  it('should not be able to create user with same email twice', async () => {
    await req(app.server).post('/users').send(mockUser);

    const resWithError = await req(app.server).post('/users').send(mockUser);

    expect(resWithError.statusCode).toEqual(409);
    expect(resWithError.body).toEqual(
      expect.objectContaining({
        message: 'E-mail already exists.',
      }),
    );
  });
});
