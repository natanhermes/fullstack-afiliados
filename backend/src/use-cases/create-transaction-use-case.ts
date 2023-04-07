import { TransactionsRepository } from '@/repositories/transactions-repository';
import { Transaction } from '@prisma/client';

interface CreateTransactionsUseCaseRequest {
  type: number;
  collaboratorId: string;
  productId: string;
  userId: string;
}

interface CreateTransactionsUseCaseResponse {
  transaction: Transaction;
}

export class CreateTransactionsUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({
    type,
    collaboratorId,
    productId,
    userId,
  }: CreateTransactionsUseCaseRequest): Promise<CreateTransactionsUseCaseResponse> {
    const transaction = await this.transactionsRepository.create({
      type,
      collaborator_id: collaboratorId,
      product_id: productId,
      user_id: userId,
    });

    return {
      transaction,
    };
  }
}
