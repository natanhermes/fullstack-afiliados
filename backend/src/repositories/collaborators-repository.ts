import { Prisma, Collaborator } from '@prisma/client';

export interface CollaboratorsRepository {
  findCollaboratorById(id: string): Promise<Collaborator | null>;
  findCollaboratorByName(name: string): Promise<Collaborator | null>;
  create(data: Prisma.CollaboratorCreateInput): Promise<Collaborator>;
}
