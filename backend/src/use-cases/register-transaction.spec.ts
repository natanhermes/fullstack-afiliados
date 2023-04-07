import { InMemoryTransactionsRepository } from '@/repositories/in-memory/in-memory-transactions-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { RegisterTransactionsUseCase } from './register-transaction-use-case';

let productsRepository: InMemoryTransactionsRepository;
let sut: RegisterTransactionsUseCase;
let transactionMocks: {
  type: number;
  collaboratorId: string;
  productId: string;
  userId: string;
};
describe('Products Use Case', () => {
  beforeEach(() => {
    productsRepository = new InMemoryTransactionsRepository();
    sut = new RegisterTransactionsUseCase(productsRepository);
    transactionMocks = {
      type: 1,
      productId: 'product-1',
      collaboratorId: 'collab-1',
      userId: 'user-1',
    };
  });

  it('should be able to register transaction', async () => {
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
