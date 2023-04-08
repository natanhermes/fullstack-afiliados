import { FastifyRequest, FastifyReply } from 'fastify';

import { z } from 'zod';
import { makeCreateTransactionUseCase } from '@/use-cases/factories/make-create-transaction-use-case';

export async function createTransaction(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const createTransactionBodySchema = z.object({
    type: z.number(),
    collaboratorId: z.string(),
    productId: z.string(),
    userId: z.string(),
  });

  const { type, collaboratorId, productId, userId } =
    createTransactionBodySchema.parse(req.body);

  const createTransactionUseCase = makeCreateTransactionUseCase();

  await createTransactionUseCase.execute({
    type,
    collaboratorId,
    productId,
    userId,
  });

  return reply.status(201).send();
}
