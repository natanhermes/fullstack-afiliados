import { PrismaTransactionsRepository } from '@/repositories/prisma/prisma-transactions-repository';
import { CreateTransactionsUseCase } from '../create-transaction-use-case';

export function makeCreateTransactionUseCase() {
  const transactionsRepository = new PrismaTransactionsRepository();
  const useCase = new CreateTransactionsUseCase(transactionsRepository);

  return useCase;
}
