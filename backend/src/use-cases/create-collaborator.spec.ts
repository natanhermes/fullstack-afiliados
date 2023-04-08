import { InMemoryCollaboratorsRepository } from '@/repositories/in-memory/in-memory-collaborator-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { CreateCollaboratorUseCase } from './create-collaborator-use-case';
import { mockCollab } from '@/utils/test/mocks/mocks-collaborators';

let collaboratorsRepository: InMemoryCollaboratorsRepository;
let sut: CreateCollaboratorUseCase;
let collaboratorMocks: {
  userId: string;
  type: string;
  comissionBalance: number;
};
describe('Collaborator Use Case', () => {
  beforeEach(() => {
    collaboratorsRepository = new InMemoryCollaboratorsRepository();
    sut = new CreateCollaboratorUseCase(collaboratorsRepository);
    collaboratorMocks = mockCollab;
  });

  it('should be able to create collaborator', async () => {
    const { collab } = await sut.execute({
      userId: collaboratorMocks.userId,
      type: collaboratorMocks.type,
      comissionBalance: collaboratorMocks.comissionBalance,
    });
    expect(collab.id).toEqual(expect.any(String));
  });
});
