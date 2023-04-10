import { PrismaTransactionsRepository } from '@/repositories/prisma/prisma-transactions-repository';
import { GetTransactionsTotalAmountUseCase } from '../get-transactions-total-amount';

export function makeGetTransactionTotalAmountUseCase() {
  const transactionsRepository = new PrismaTransactionsRepository();
  const useCase = new GetTransactionsTotalAmountUseCase(transactionsRepository);

  return useCase;
}
