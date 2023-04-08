import req from 'supertest';
import { FastifyInstance } from 'fastify';

interface MockTransactionData {
  type: number;
  productId: string;
  collaboratorId: string;
  userId: string;
}

export async function createTransactionsE2E(
  app: FastifyInstance,
  transaction: MockTransactionData,
  token: string,
) {
  const res = await req(app.server)
    .post('/transactions')
    .set('Authorization', `Bearer ${token}`)
    .send(transaction);

  return res;
}
