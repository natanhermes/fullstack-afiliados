import { InMemoryTransactionsRepository } from '@/repositories/in-memory/in-memory-transactions-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { CreateTransactionsUseCase } from './create-transaction-use-case';
import { mockTransaction1 } from '@/utils/test/mocks/mocks-transactions';

let productsRepository: InMemoryTransactionsRepository;
let sut: CreateTransactionsUseCase;
let transactionMocks: {
  type: number;
  collaboratorId: string;
  productId: string;
  userId: string;
};
describe('Products Use Case', () => {
  beforeEach(() => {
    productsRepository = new InMemoryTransactionsRepository();
    sut = new CreateTransactionsUseCase(productsRepository);
    transactionMocks = mockTransaction1;
  });

  it('should be able to create transaction', async () => {
    const { type, collaboratorId, productId, userId } = transactionMocks;
    const { transaction } = await sut.execute({
      type,
      collaboratorId,
      productId,
      userId,
    });
    expect(transaction.id).toEqual(expect.any(String));
  });
});
