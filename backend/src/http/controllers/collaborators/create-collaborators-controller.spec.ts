import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import { mockCollab } from '@/utils/test/mocks/mocks-collaborators';
import { createCollaboratorToE2E } from '@/utils/test/create-collaborator-to-e2e';
import { mockUser } from '@/utils/test/mocks/mocks-users';

describe('Create Collaborator (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it('should be able to create collaborator', async () => {
    const { token, user } = await createAuthenticateUser(app, mockUser);

    const collabData = { ...mockCollab, userId: user.id };
    const res = await createCollaboratorToE2E(app, collabData, token);

    expect(res.statusCode).toEqual(201);
    expect(res.body.collab).toEqual(
      expect.objectContaining({
        user_id: user.id,
      }),
    );
  });
});
