import { CollaboratorsRepository } from '@/repositories/collaborators-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { Collaborator } from '@prisma/client';

interface GetCollaboratorProfileUseCaseRequest {
  collabId: string;
}

interface GetCollaboratorProfileUseCaseResponse {
  collab: Collaborator;
}

export class GetCollaboratorProfileUseCase {
  constructor(private collaboratorsRepository: CollaboratorsRepository) {}

  async execute({
    collabId,
  }: GetCollaboratorProfileUseCaseRequest): Promise<GetCollaboratorProfileUseCaseResponse> {
    const collab = await this.collaboratorsRepository.findCollaboratorById(
      collabId,
    );

    if (!collab) {
      throw new ResourceNotFoundError();
    }

    return {
      collab,
    };
  }
}
