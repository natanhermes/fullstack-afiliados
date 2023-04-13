import { FastifyInstance } from 'fastify';

import { verifyJWT } from '@/http/middlewares/verify-jwt';
import { createProduct } from './create-products';

export async function productsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT);

  app.post('/products', createProduct);
}
