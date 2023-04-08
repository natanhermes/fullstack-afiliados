import req from 'supertest';
import { FastifyInstance } from 'fastify';

interface MockProductData {
  name: string;
  amountSales: number;
  price: number;
  collaboratorId: string;
}

export async function createProductsToE2E(
  app: FastifyInstance,
  product: MockProductData,
  token: string,
) {
  const res = await req(app.server)
    .post('/products')
    .set('Authorization', `Bearer ${token}`)
    .send(product);

  return res;
}
