import req from 'supertest';
import { FastifyInstance } from 'fastify';

interface MockCollaboratorData {
  id: string;
  type: string;
  comissionBalance: number;
  userId: string;
}

export async function createCollaboratorToE2E(
  app: FastifyInstance,
  collaborator: MockCollaboratorData,
  token: string,
) {
  const res = await req(app.server)
    .post('/collaborators')
    .set('Authorization', `Bearer ${token}`)
    .send(collaborator);
  return res;
}
