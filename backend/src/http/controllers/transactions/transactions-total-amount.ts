import { FastifyRequest, FastifyReply } from 'fastify';

import { makeGetTransactionTotalAmountUseCase } from '@/use-cases/factories/make-get-transactions-total-amount';
import { z } from 'zod';

export async function transactionsTotalAmount(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const transactionsTotalAmountQuerySchema = z.object({
    productId: z.string(),
  });

  const { productId } = transactionsTotalAmountQuerySchema.parse(req.query);

  const getTransactionsTotalAmountUseCase =
    makeGetTransactionTotalAmountUseCase();
  const { totalAmount } = await getTransactionsTotalAmountUseCase.execute({
    userId: req.user.sub,
    productId,
  });

  return reply.status(200).send({
    totalAmount,
  });
}
