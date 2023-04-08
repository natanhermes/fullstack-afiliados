import { CollaboratorsRepository } from '@/repositories/collaborators-repository';
import { Collaborator } from '@prisma/client';

interface CreateCollaboratorUseCaseRequest {
  type: string;
  name: string;
  comissionBalance: number;
}

interface CreateCollaboratorUseCaseResponse {
  collab: Collaborator;
}

export class CreateCollaboratorUseCase {
  constructor(private collaboratorsRepository: CollaboratorsRepository) {}

  async execute({
    name,
    type,
    comissionBalance,
  }: CreateCollaboratorUseCaseRequest): Promise<CreateCollaboratorUseCaseResponse> {
    const collab = await this.collaboratorsRepository.create({
      name,
      type,
      commission_balance: comissionBalance,
    });

    return {
      collab,
    };
  }
}
