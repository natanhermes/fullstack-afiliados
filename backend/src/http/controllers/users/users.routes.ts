import { verifyJWT } from '@/http/middlewares/verify-jwt';
import { FastifyInstance } from 'fastify';
import { createUser } from './create-user';
import { authenticate } from './authenticate';
import { profile } from './profile';
import { refresh } from './refresh';

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', createUser);
  app.post('/sessions', authenticate);

  app.patch('/token/refresh', refresh);

  /** Authenticated Routes */
  app.get('/me', { onRequest: [verifyJWT] }, profile);
}
