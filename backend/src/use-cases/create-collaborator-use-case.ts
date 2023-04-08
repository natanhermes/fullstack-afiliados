import { CollaboratorsRepository } from '@/repositories/collaborators-repository';
import { Collaborator } from '@prisma/client';

interface CreateCollaboratorUseCaseRequest {
  type: string;
  comissionBalance: number;
  userId?: string;
}

interface CreateCollaboratorUseCaseResponse {
  collab: Collaborator;
}

export class CreateCollaboratorUseCase {
  constructor(private collaboratorsRepository: CollaboratorsRepository) {}

  async execute({
    type,
    comissionBalance,
    userId,
  }: CreateCollaboratorUseCaseRequest): Promise<CreateCollaboratorUseCaseResponse> {
    const collab = await this.collaboratorsRepository.create({
      type,
      commission_balance: comissionBalance,
      user_id: userId,
    });

    return {
      collab,
    };
  }
}
