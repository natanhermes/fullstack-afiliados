import { CollaboratorsRepository } from '@/repositories/collaborators-repository';
import { Collaborator } from '@prisma/client';

interface RegisterCollaboratorUseCaseRequest {
  type: string;
  name: string;
  commissionBalance: number;
}

interface RegisterCollaboratorUseCaseResponse {
  collab: Collaborator;
}

export class RegisterCollaboratorUseCase {
  constructor(private collaboratorsRepository: CollaboratorsRepository) {}

  async execute({
    name,
    type,
    commissionBalance,
  }: RegisterCollaboratorUseCaseRequest): Promise<RegisterCollaboratorUseCaseResponse> {
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
