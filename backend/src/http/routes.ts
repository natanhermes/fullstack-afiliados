import { FastifyInstance } from 'fastify';
import { createUser } from './controllers/create-user';
import { authenticate } from './controllers/authenticate';
import { profile } from './controllers/profile';
import { verifyJWT } from './middlewares/verify-jwt';

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', createUser);
  app.post('/sessions', authenticate);

  /** Authenticated Routes */
  app.get('/me', { onRequest: [verifyJWT] }, profile);
}
