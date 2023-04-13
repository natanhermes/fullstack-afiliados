import { Prisma, Transaction } from '@prisma/client';

export type TransactionsWithoutIds = Omit<
  Transaction,
  'collaborator_id' | 'product_id' | 'user_id'
>;

export interface TransactionsRepository {
  findTransactionById(id: string): Promise<Transaction | null>;
  findManyByUserId(
    userId: string,
    page?: number,
  ): Promise<TransactionsWithoutIds[]>;
  create(data: Prisma.TransactionUncheckedCreateInput): Promise<Transaction>;
}
