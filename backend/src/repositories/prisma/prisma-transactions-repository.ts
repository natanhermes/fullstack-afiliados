import { prisma } from '@/lib/prisma';
import { Prisma, Transaction } from '@prisma/client';
import {
  TransactionsWithoutIds,
  TransactionsRepository,
} from '../transactions-repository';

export class PrismaTransactionsRepository implements TransactionsRepository {
  async getTotalAmountTransactionsByProduct(
    userId: string,
    productId: string,
  ): Promise<number> {
    const pricesTransactions = await prisma.$queryRaw<{ price: number }[]>`
      select price from transactions t
      inner join products p on t.product_id = p.id
      inner join users u on u.id = t.user_id
      where t.user_id =${userId} and t.product_id = ${productId}
    `;

    const totalAmounts = pricesTransactions.reduce((total, product) => {
      return total + product.price;
    }, 0);
    return totalAmounts;
  }
  async findTransactionById(id: string): Promise<Transaction | null> {
    const transaction = await prisma.transaction.findUnique({
      where: {
        id,
      },
    });

    return transaction;
  }

  async findManyByUserId(
    userId: string,
    page?: number,
  ): Promise<TransactionsWithoutIds[]> {
    const transactions = await prisma.transaction.findMany({
      where: {
        user_id: userId,
      },
      select: {
        id: true,
        type: true,
        created_at: true,
        collaborator: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            amount_sales: true,
          },
        },
      },
      take: page && 10,
      skip: page && (page - 1) * 10,
    });

    console.log('TTRANSACTIONS', transactions);

    return transactions;
  }
  async create(data: Prisma.TransactionUncheckedCreateInput) {
    const transaction = await prisma.transaction.create({
      data,
    });

    return transaction;
  }
}
