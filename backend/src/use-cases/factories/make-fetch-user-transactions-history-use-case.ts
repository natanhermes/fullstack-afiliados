import { PrismaTransactionsRepository } from '@/repositories/prisma/prisma-transactions-repository';
import { FetchUserTransactionsHistoryUseCase } from '../fetch-user-transactions-history-use-case';

export function makeFetchUserTransactionsHistoryUseCase() {
  const transactionsRepository = new PrismaTransactionsRepository();
  const useCase = new FetchUserTransactionsHistoryUseCase(
    transactionsRepository,
  );

  return useCase;
}
