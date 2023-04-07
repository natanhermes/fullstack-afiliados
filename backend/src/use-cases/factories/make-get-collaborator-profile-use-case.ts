import { PrismaCollaboratorsRepository } from '@/repositories/prisma/prisma-collaborators-repository';
import { GetCollaboratorProfileUseCase } from '../get-collaborator-profile-use-case';

export function makeGetCollaboratorProfileUseCase() {
  const collaboratorsRepository = new PrismaCollaboratorsRepository();
  const useCase = new GetCollaboratorProfileUseCase(collaboratorsRepository);

  return useCase;
}
