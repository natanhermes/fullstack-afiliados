import { InMemoryTransactionsRepository } from '@/repositories/in-memory/in-memory-transactions-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { FetchUserTransactionsHistoryUseCase } from './fetch-user-transactions-history-use-case';

let transactionsRepository: InMemoryTransactionsRepository;
let sut: FetchUserTransactionsHistoryUseCase;
let transactionsMocks: {
  type: number;
  collaboratorId: string;
  productId: string;
  userId: string;
}[];

describe('Fetch User Transactions History Use Case', () => {
  beforeEach(() => {
    transactionsRepository = new InMemoryTransactionsRepository();
    sut = new FetchUserTransactionsHistoryUseCase(transactionsRepository);
    transactionsMocks = [
      {
        type: 1,
        productId: 'product-1',
        collaboratorId: 'collab-1',
        userId: 'user-1',
      },
      {
        type: 2,
        productId: 'product-2',
        collaboratorId: 'collab-2',
        userId: 'user-1',
      },
    ];
  });

  it('should be able to fetch transaction history', async () => {
    await transactionsRepository.create({
      type: transactionsMocks[0].type,
      collaborator_id: transactionsMocks[0].collaboratorId,
      product_id: transactionsMocks[0].productId,
      user_id: transactionsMocks[0].userId,
    });

    await transactionsRepository.create({
      type: transactionsMocks[1].type,
      collaborator_id: transactionsMocks[1].collaboratorId,
      product_id: transactionsMocks[1].productId,
      user_id: transactionsMocks[1].userId,
    });

    const { transactions } = await sut.execute({
      userId: 'user-1',
    });

    expect(transactions).toHaveLength(2);
    expect(transactions).toEqual([
      expect.objectContaining({
        collaborator_id: transactionsMocks[0].collaboratorId,
      }),
      expect.objectContaining({
        collaborator_id: transactionsMocks[1].collaboratorId,
      }),
    ]);
  });

  it('should be able to fetch paginated transaction history', async () => {
    for (let i = 1; i <= 12; i++) {
      await transactionsRepository.create({
        type: i,
        product_id: `product-${i}`,
        collaborator_id: `collab-${i}`,
        user_id: 'user-1',
      });
    }

    const { transactions } = await sut.execute({
      userId: 'user-1',
      page: 2,
    });

    expect(transactions).toHaveLength(2);
    expect(transactions).toEqual([
      expect.objectContaining({
        collaborator_id: 'collab-11',
      }),
      expect.objectContaining({
        collaborator_id: 'collab-12',
      }),
    ]);
  });
});
