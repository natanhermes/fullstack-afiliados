import req from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import { mockUser } from '@/utils/test/mocks/mocks-users';

describe('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it('should be able to get user profile', async () => {
    const { token } = await createAuthenticateUser(app);

    const profileResponse = await req(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`);

    expect(profileResponse.statusCode).toEqual(200);
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: mockUser.email,
      }),
    );
  });

  it('should not be able to get user profile without authenticated', async () => {
    const resWithUnauthorizedError = await req(app.server).get('/me');

    expect(resWithUnauthorizedError.statusCode).toEqual(401);
    expect(resWithUnauthorizedError.body).toEqual(
      expect.objectContaining({
        message: 'Unauthorized.',
      }),
    );
  });
});
