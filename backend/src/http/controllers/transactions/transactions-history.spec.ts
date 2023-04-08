import req from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import { createCollaboratorToE2E } from '@/utils/test/create-collaborator-to-e2e';
import { mockCollab } from '@/utils/test/mocks/mocks-collaborators';
import { createProductsToE2E } from '@/utils/test/create-products-to-e2e';
import { mockProduct } from '@/utils/test/mocks/mocks-products';
import { createTransactionsE2E } from '@/utils/test/create-transactions-to-e2e';
import {
  mockTransaction1,
  mockTransaction2,
} from '@/utils/test/mocks/mocks-transactions';
import { mockUser } from '@/utils/test/mocks/mocks-users';

describe('Transactions History (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it('should be able to list the history of transactions', async () => {
    const { token, user } = await createAuthenticateUser(app, mockUser);

    const collabData = { ...mockCollab, userId: user.id };
    const { body: responseCollab } = await createCollaboratorToE2E(
      app,
      collabData,
      token,
    );

    const { collab } = responseCollab;

    const productData = {
      ...mockProduct,
      collaboratorId: collab.id,
    };

    const { body: responseProduct } = await createProductsToE2E(
      app,
      productData,
      token,
    );

    const { product } = responseProduct;

    const transactions = [
      {
        type: mockTransaction1.type,
        productId: product.id,
        collaboratorId: collab.id,
        userId: user.id,
      },
      {
        type: mockTransaction2.type,
        productId: product.id,
        collaboratorId: collab.id,
        userId: user.id,
      },
    ];

    await createTransactionsE2E(app, transactions[0], token);
    await createTransactionsE2E(app, transactions[1], token);

    const res = await req(app.server)
      .get('/transactions/history')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.transactions).toEqual([
      expect.objectContaining({
        user_id: user.id,
      }),
      expect.objectContaining({
        user_id: user.id,
      }),
    ]);
  });
});
