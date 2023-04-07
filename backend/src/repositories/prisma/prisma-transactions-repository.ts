import { prisma } from '@/lib/prisma';
import { Prisma, Transaction } from '@prisma/client';
import { TransactionsRepository } from '../transactions-repository';

export class PrismaTransactionsRepository implements TransactionsRepository {
  async findTransactionById(id: string): Promise<Transaction | null> {
    const transaction = await prisma.transaction.findUnique({
      where: {
        id,
      },
    });

    return transaction;
  }

  async findManyByUserId(userId: string, page: number): Promise<Transaction[]> {
    const transactions = await prisma.transaction.findMany({
      where: {
        user_id: userId,
      },
      take: 10,
      skip: (page - 1) * 20,
    });

    return transactions;
  }
  async create(data: Prisma.TransactionUncheckedCreateInput) {
    const transaction = await prisma.transaction.create({
      data,
    });

    return transaction;
  }
}
