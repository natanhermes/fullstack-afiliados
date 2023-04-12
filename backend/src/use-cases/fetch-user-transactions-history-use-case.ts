import {
  TransactionsRepository,
  TransactionsWithoutIds,
} from '@/repositories/transactions-repository';

interface FetchUserTransactionsHistoryUseCaseRequest {
  userId: string;
  page?: number;
}

interface FetchUserTransactionsHistoryUseCaseResponse {
  transactions: TransactionsWithoutIds[];
}

export class FetchUserTransactionsHistoryUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({
    userId,
    page,
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
