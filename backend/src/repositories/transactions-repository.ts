import { Prisma, Transaction } from '@prisma/client';

export interface TransactionsRepository {
  findTransactionById(id: string): Promise<Transaction | null>;
  getTotalAmountTransactionsByProduct(
    userId: string,
    productId: string,
  ): Promise<number>;
  create(data: Prisma.TransactionUncheckedCreateInput): Promise<Transaction>;
}
