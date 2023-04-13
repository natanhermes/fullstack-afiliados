import { PrismaTransactionsRepository } from '@/repositories/prisma/prisma-transactions-repository';
import { GetTransactionsInfoUseCase } from '../get-transaction-info-use-case';

export function makeGetTransactionInfoUseCase() {
  const transactionsRepository = new PrismaTransactionsRepository();
  const useCase = new GetTransactionsInfoUseCase(transactionsRepository);

  return useCase;
}
