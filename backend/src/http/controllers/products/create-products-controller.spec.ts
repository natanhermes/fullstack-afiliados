import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import { mockProduct } from '@/utils/test/mocks/mocks-products';
import { createCollaboratorToE2E } from '@/utils/test/create-collaborator-to-e2e';
import { createProductsToE2E } from '@/utils/test/create-products-to-e2e';
import { mockCollab } from '@/utils/test/mocks/mocks-collaborators';

describe('Create Product (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it('should be able to create product', async () => {
    const { token } = await createAuthenticateUser(app);

    const collabResponse = await createCollaboratorToE2E(
      app,
      mockCollab,
      token,
    );
    const { collab } = collabResponse.body;
    const product = { ...mockProduct, collaboratorId: collab.id };

    const res = await createProductsToE2E(app, product, token);

    expect(res.statusCode).toEqual(201);
    expect(res.body.product).toEqual(
      expect.objectContaining({
        collaborator_id: collab.id,
      }),
    );
  });

  it('should not be able to create product with same name twice', async () => {
    const { token } = await createAuthenticateUser(app);

    const collabResponse = await createCollaboratorToE2E(
      app,
      mockCollab,
      token,
    );
    const { collab } = collabResponse.body;
    const product = { ...mockProduct, collaboratorId: collab.id };

    await createProductsToE2E(app, product, token);

    const resWithError = await createProductsToE2E(app, product, token);

    expect(resWithError.statusCode).toEqual(409);
    expect(resWithError.body).toEqual(
      expect.objectContaining({
        message: 'Item already exists.',
      }),
    );
  });
});
