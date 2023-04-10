import { prisma } from '@/lib/prisma';
import { Prisma, Collaborator } from '@prisma/client';
import { CollaboratorsRepository } from '../collaborators-repository';

export class PrismaCollaboratorsRepository implements CollaboratorsRepository {
  async findCollaboratorByName(name: string): Promise<Collaborator | null> {
    const collab = await prisma.collaborator.findUnique({
      where: {
        name,
      },
    });

    return collab;
  }
  async findCollaboratorById(id: string): Promise<Collaborator | null> {
    const collab = await prisma.collaborator.findUnique({
      where: {
        id,
      },
    });

    return collab;
  }
  async create(data: Prisma.CollaboratorCreateInput): Promise<Collaborator> {
    const collab = await prisma.collaborator.create({
      data,
    });

    return collab;
  }
}
