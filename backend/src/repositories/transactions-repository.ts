import { Prisma, Transaction } from '@prisma/client';

export interface TransactionsRepository {
  findTransactionById(id: string): Promise<Transaction | null>;
  findManyByUserId(userId: string, page: number): Promise<Transaction[]>;
  create(data: Prisma.TransactionUncheckedCreateInput): Promise<Transaction>;
}
