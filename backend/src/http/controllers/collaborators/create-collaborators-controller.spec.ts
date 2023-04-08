import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import { mockCollab } from '@/utils/test/mocks/mocks-collaborators';
import { createCollaboratorToE2E } from '@/utils/test/create-collaborator-to-e2e';

describe('Create Collaborator (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it('should be able to create collaborator', async () => {
    const { token } = await createAuthenticateUser(app);

    const res = await createCollaboratorToE2E(app, mockCollab, token);

    expect(res.statusCode).toEqual(201);
    expect(res.body.collab).toEqual(
      expect.objectContaining({
        name: mockCollab.name,
      }),
    );
  });
});
