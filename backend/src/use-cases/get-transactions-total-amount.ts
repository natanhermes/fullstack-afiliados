import { TransactionsRepository } from '@/repositories/transactions-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface GetTransactionsTotalAmountUseCaseRequest {
  userId: string;
  productId: string;
}

interface GetTransactionsTotalAmountUseCaseResponse {
  totalAmount: number;
}

export class GetTransactionsTotalAmountUseCase {
  constructor(private transactiosRepository: TransactionsRepository) {}

  async execute({
    userId,
    productId,
  }: GetTransactionsTotalAmountUseCaseRequest): Promise<GetTransactionsTotalAmountUseCaseResponse> {
    const totalAmount =
      await this.transactiosRepository.getTotalAmountTransactionsByProduct(
        userId,
        productId,
      );

    if (!totalAmount) {
      throw new ResourceNotFoundError();
    }

    return { totalAmount };
  }
}
