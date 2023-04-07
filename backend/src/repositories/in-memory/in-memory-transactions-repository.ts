import { Transaction, Prisma } from '@prisma/client';
import { TransactionsRepository } from '../transactions-repository';
import { randomUUID } from 'node:crypto';

export class InMemoryTransactionsRepository implements TransactionsRepository {
  public items: Transaction[] = [];
  async findManyByUserId(userId: string, page: number): Promise<Transaction[]> {
    return this.items
      .filter((transaction) => transaction.user_id === userId)
      .slice((page - 1) * 10, page * 10);
  }
  async findTransactionById(id: string): Promise<Transaction | null> {
    const product = this.items.find((el) => el.id === id);

    if (!product) {
      return null;
    }

    return product;
  }

  async create(data: Prisma.TransactionUncheckedCreateInput) {
    const product: Transaction = {
      id: randomUUID(),
      type: data.type,
      created_at: new Date(),
      collaborator_id: data.collaborator_id,
      product_id: data.product_id,
      user_id: data.user_id,
    };

    this.items.push(product);
    return product;
  }
}
