import { TransactionsRepository } from '@/repositories/transactions-repository';
import { Transaction } from '@prisma/client';

interface RegisterTransactionsUseCaseRequest {
  type: number;
  collaboratorId: string;
  productId: string;
  userId: string;
}

interface RegisterTransactionsUseCaseResponse {
  transaction: Transaction;
}

export class RegisterTransactionsUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({
    type,
    collaboratorId,
    productId,
    userId,
  }: RegisterTransactionsUseCaseRequest): Promise<RegisterTransactionsUseCaseResponse> {
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
