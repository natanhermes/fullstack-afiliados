import { FastifyInstance } from 'fastify';

import { verifyJWT } from '@/http/middlewares/verify-jwt';
import { createCollaborator } from './create-collaborator';

export async function collaboratorsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT);

  app.post('/collaborators', createCollaborator);
}
