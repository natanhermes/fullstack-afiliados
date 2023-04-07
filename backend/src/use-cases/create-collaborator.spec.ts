import { InMemoryCollaboratorsRepository } from '@/repositories/in-memory/in-memory-collaborator-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { CreateCollaboratorUseCase } from './create-collaborator-use-case';

let collaboratorsRepository: InMemoryCollaboratorsRepository;
let sut: CreateCollaboratorUseCase;
let collaboratorMocks: { name: string; type: string; comissionBalance: number };
describe('Collaborator Use Case', () => {
  beforeEach(() => {
    collaboratorsRepository = new InMemoryCollaboratorsRepository();
    sut = new CreateCollaboratorUseCase(collaboratorsRepository);
    collaboratorMocks = {
      name: 'John Doe',
      type: 'producer',
      comissionBalance: 0,
    };
  });

  it('should be able to create collaborator', async () => {
    const { collab } = await sut.execute({
      name: collaboratorMocks.name,
      type: collaboratorMocks.type,
      commissionBalance: collaboratorMocks.comissionBalance,
    });
    expect(collab.id).toEqual(expect.any(String));
  });
});
