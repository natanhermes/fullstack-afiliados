import { InMemoryCollaboratorsRepository } from '@/repositories/in-memory/in-memory-collaborator-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { RegisterCollaboratorUseCase } from './register-collaborator-use-case';

let collaboratorsRepository: InMemoryCollaboratorsRepository;
let sut: RegisterCollaboratorUseCase;
let collaboratorMocks: { name: string; type: string; comissionBalance: number };
describe('Collaborator Use Case', () => {
  beforeEach(() => {
    collaboratorsRepository = new InMemoryCollaboratorsRepository();
    sut = new RegisterCollaboratorUseCase(collaboratorsRepository);
    collaboratorMocks = {
      name: 'John Doe',
      type: 'producer',
      comissionBalance: 0,
    };
  });

  it('should be able to register collaborator', async () => {
    const { collab } = await sut.execute({
      name: collaboratorMocks.name,
      type: collaboratorMocks.type,
      commissionBalance: collaboratorMocks.comissionBalance,
    });
    expect(collab.id).toEqual(expect.any(String));
  });
});
