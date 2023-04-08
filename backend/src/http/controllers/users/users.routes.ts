import { verifyJWT } from '@/http/middlewares/verify-jwt';
import { FastifyInstance } from 'fastify';
import { createUser } from './create-user';
import { authenticate } from './authenticate';
import { profile } from './profile';

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', createUser);
  app.post('/sessions', authenticate);

  /** Authenticated Routes */
  app.get('/me', { onRequest: [verifyJWT] }, profile);
}
