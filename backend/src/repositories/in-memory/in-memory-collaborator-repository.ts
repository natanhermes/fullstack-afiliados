import { Collaborator, Prisma } from '@prisma/client';
import { CollaboratorsRepository } from '../collaborators-repository';
import { randomUUID } from 'node:crypto';

export class InMemoryCollaboratorsRepository
  implements CollaboratorsRepository
{
  public items: Collaborator[] = [];
  async findCollaboratorByName(name: string): Promise<Collaborator | null> {
    const collab = this.items.find((el) => el.name === name);

    if (!collab) {
      return null;
    }

    return collab;
  }
  async findCollaboratorById(id: string): Promise<Collaborator | null> {
    const collab = this.items.find((el) => el.id === id);

    if (!collab) {
      return null;
    }

    return collab;
  }
  async create(data: Prisma.CollaboratorCreateInput) {
    const collab: Collaborator = {
      id: randomUUID(),
      name: data.name,
      type: data.type,
      commission_balance: 100,
      created_at: new Date(),
    };

    this.items.push(collab);
    return collab;
  }
}
