import { PrismaCollaboratorsRepository } from '@/repositories/prisma/prisma-collaborators-repository';
import { CreateCollaboratorUseCase } from '../create-collaborator-use-case';

export function makeCreateCollaboratorUseCase() {
  const collaboratorsRepository = new PrismaCollaboratorsRepository();
  const useCase = new CreateCollaboratorUseCase(collaboratorsRepository);

  return useCase;
}
