import { FastifyInstance } from 'fastify';
import req from 'supertest';
import { mockUser } from './mocks/mocks-users';

export async function createAuthenticateUser(app: FastifyInstance) {
  await req(app.server).post('/users').send(mockUser);

  const authResponse = await req(app.server).post('/sessions').send({
    email: mockUser.email,
    password: mockUser.password,
  });

  const { token } = authResponse.body;

  const { body: responseUser } = await req(app.server)
    .get('/me')
    .set('Authorization', `Bearer ${token}`);

  return { token, user: responseUser.user };
}
