import { InMemoryTransactionsRepository } from '@/repositories/in-memory/in-memory-transactions-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { GetTransactionsInfoUseCase } from './get-transaction-info-use-case';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { mockTransaction1 } from '@/utils/test/mocks/mocks-transactions';

let transactionsRepository: InMemoryTransactionsRepository;
let sut: GetTransactionsInfoUseCase;
let transactionMocks: {
  type: number;
  collaboratorId: string;
  productId: string;
  userId: string;
};
describe('Get Transactions Info Use Case', () => {
  beforeEach(() => {
    transactionsRepository = new InMemoryTransactionsRepository();
    sut = new GetTransactionsInfoUseCase(transactionsRepository);
    transactionMocks = mockTransaction1;
  });

  it('should be able to get transaction info by id', async () => {
    const { type, collaboratorId, productId, userId } = transactionMocks;
    const { id: transactionId } = await transactionsRepository.create({
      type,
      collaborator_id: collaboratorId,
      product_id: productId,
      user_id: userId,
    });

    const { transaction } = await sut.execute({
      transactionId,
    });

    expect(transaction.id).toEqual(expect.any(String));
  });

  it('should not be able to get transaction info with wrong id', async () => {
    const handleTransactionNotExists = () =>
      sut.execute({
        transactionId: 'non-existing-id',
      });
    await expect(handleTransactionNotExists).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    );
  });
});
