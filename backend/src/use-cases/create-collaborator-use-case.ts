import { CollaboratorsRepository } from '@/repositories/collaborators-repository';
import { Collaborator } from '@prisma/client';

interface CreateCollaboratorUseCaseRequest {
  type: string;
  name: string;
  commissionBalance: number;
}

interface CreateCollaboratorUseCaseResponse {
  collab: Collaborator;
}

export class CreateCollaboratorUseCase {
  constructor(private collaboratorsRepository: CollaboratorsRepository) {}

  async execute({
    name,
    type,
    commissionBalance,
  }: CreateCollaboratorUseCaseRequest): Promise<CreateCollaboratorUseCaseResponse> {
    const collab = await this.collaboratorsRepository.create({
      name,
      type,
      commission_balance: commissionBalance,
    });

    return {
      collab,
    };
  }
}
