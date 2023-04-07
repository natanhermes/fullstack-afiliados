import { TransactionsRepository } from '@/repositories/transactions-repository';
import { Transaction } from '@prisma/client';

interface FetchUserTransactionsHistoryUseCaseRequest {
  userId: string;
  page?: number;
}

interface FetchUserTransactionsHistoryUseCaseResponse {
  transactions: Transaction[];
}

export class FetchUserTransactionsHistoryUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({
    userId,
    page = 1,
  }: FetchUserTransactionsHistoryUseCaseRequest): Promise<FetchUserTransactionsHistoryUseCaseResponse> {
    const transactions = await this.transactionsRepository.findManyByUserId(
      userId,
      page,
    );

    return {
      transactions,
    };
  }
}
