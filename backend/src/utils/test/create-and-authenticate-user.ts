import { FastifyInstance } from 'fastify';
import req from 'supertest';

interface MockUserData {
  id: string;
  name: string;
  email: string;
  password: string;
}

export async function createAuthenticateUser(
  app: FastifyInstance,
  user: MockUserData,
) {
  await req(app.server).post('/users').send(user);

  const authResponse = await req(app.server).post('/sessions').send({
    email: user.email,
    password: user.password,
  });

  const { token } = authResponse.body;

  const { body: responseUser } = await req(app.server)
    .get('/me')
    .set('Authorization', `Bearer ${token}`);

  return { token, user: responseUser.user };
}
