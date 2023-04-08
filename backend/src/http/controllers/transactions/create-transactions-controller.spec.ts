import req from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import { createCollaboratorToE2E } from '@/utils/test/create-collaborator-to-e2e';
import { mockCollab } from '@/utils/test/mocks/mocks-collaborators';
import { createProductsToE2E } from '@/utils/test/create-products-to-e2e';
import { mockProduct } from '@/utils/test/mocks/mocks-products';
import { mockTransaction1 } from '@/utils/test/mocks/mocks-transactions';
import { mockUser } from '@/utils/test/mocks/mocks-users';

describe('Create Transaction (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it('should be able to create transaction', async () => {
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

    const res = await req(app.server)
      .post('/transactions')
      .set('Authorization', `Bearer ${token}`)
      .send({
        type: mockTransaction1.type,
        productId: product.id,
        collaboratorId: collab.id,
        userId: user.id,
      });

    expect(res.statusCode).toEqual(201);
  });
});
