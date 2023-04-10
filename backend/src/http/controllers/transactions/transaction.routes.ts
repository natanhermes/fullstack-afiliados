import { FastifyInstance } from 'fastify';

import { verifyJWT } from '@/http/middlewares/verify-jwt';
import { createTransaction } from './create-transaction';
import { transactionsHistory } from './transactions-history';
import { transactionsTotalAmount } from './transactions-total-amount';

export async function transactionsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT);

  app.get('/transactions/history', transactionsHistory);
  app.get('/transactions/total-by-product', transactionsTotalAmount);

  app.post('/transactions', createTransaction);
}
