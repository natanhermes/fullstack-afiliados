import { TransactionsRepository } from '@/repositories/transactions-repository';
import { Transaction } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface GetTransactionsInfoUseCaseRequest {
  transactionId: string;
}

interface GetTransactionsInfoUseCaseResponse {
  transaction: Transaction;
}

export class GetTransactionsInfoUseCase {
  constructor(private transactiosRepository: TransactionsRepository) {}

  async execute({
    transactionId,
  }: GetTransactionsInfoUseCaseRequest): Promise<GetTransactionsInfoUseCaseResponse> {
    const transaction = await this.transactiosRepository.findTransactionById(
      transactionId,
    );

    if (!transaction) {
      throw new ResourceNotFoundError();
    }

    return {
      transaction,
    };
  }
}
