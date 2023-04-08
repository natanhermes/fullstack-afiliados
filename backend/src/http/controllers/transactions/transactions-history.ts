import { FastifyRequest, FastifyReply } from 'fastify';

import { z } from 'zod';
import { makeFetchUserTransactionsHistoryUseCase } from '@/use-cases/factories/make-fetch-user-transactions-history-use-case';

export async function transactionsHistory(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const transactionsHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = transactionsHistoryQuerySchema.parse(req.query);

  const fetchUserTransactionsUseCase =
    makeFetchUserTransactionsHistoryUseCase();

  const { transactions } = await fetchUserTransactionsUseCase.execute({
    userId: req.user.sub,
    page,
  });

  return reply.status(200).send({
    transactions,
  });
}
