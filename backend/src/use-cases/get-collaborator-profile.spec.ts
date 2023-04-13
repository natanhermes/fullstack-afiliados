import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryCollaboratorsRepository } from '@/repositories/in-memory/in-memory-collaborator-repository';
import { GetCollaboratorProfileUseCase } from './get-collaborator-profile-use-case';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { mockCollab } from '@/utils/test/mocks/mocks-collaborators';

let collaboratorsRepository: InMemoryCollaboratorsRepository;
/**
 * System Under Test
 */
let sut: GetCollaboratorProfileUseCase;
let collaboratorMocks: { name: string; type: string; comissionBalance: number };

describe('Get Collaborator Profile Use Case', () => {
  beforeEach(() => {
    collaboratorsRepository = new InMemoryCollaboratorsRepository();
    sut = new GetCollaboratorProfileUseCase(collaboratorsRepository);
    collaboratorMocks = mockCollab;
  });

  it('should be able to get collaborator profile', async () => {
    const { name, type, comissionBalance } = collaboratorMocks;

    const createdCollab = await collaboratorsRepository.create({
      name,
      type,
      commission_balance: comissionBalance,
    });

    const { collab } = await sut.execute({
      collabId: createdCollab.id,
    });

    expect(collab.id).toEqual(expect.any(String));
    expect(collab.name).toEqual(name);
  });

  it('should not be able to get collaborator profile with wrong id', async () => {
    const handleCollabNotExists = () =>
      sut.execute({
        collabId: 'non-existing-id',
      });
    await expect(handleCollabNotExists).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    );
  });
});
