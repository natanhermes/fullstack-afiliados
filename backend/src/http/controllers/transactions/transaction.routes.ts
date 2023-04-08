import { FastifyInstance } from 'fastify';

import { verifyJWT } from '@/http/middlewares/verify-jwt';
import { createTransaction } from './create-transaction';
import { transactionsHistory } from './transactions-history';

export async function transactionsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT);

  app.get('/transactions/history', transactionsHistory);

  app.post('/transactions', createTransaction);
}
