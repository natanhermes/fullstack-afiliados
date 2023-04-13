import { FastifyRequest, FastifyReply } from 'fastify';

import { z } from 'zod';
import { ItemAlreadyExistsError } from '@/use-cases/errors/item-already-exists-error';
import { makeCreateProductUseCase } from '@/use-cases/factories/make-create-product-use-case';

export async function createProduct(req: FastifyRequest, reply: FastifyReply) {
  const createProductBodySchema = z.object({
    name: z.string(),
    price: z.number(),
    amountSales: z.number().default(0),
    collaboratorId: z.string(),
  });

  const { name, price, amountSales, collaboratorId } =
    createProductBodySchema.parse(req.body);

  try {
    const createProductUseCase = makeCreateProductUseCase();

    const product = await createProductUseCase.execute({
      name,
      price,
      amountSales,
      collaboratorId,
    });
    return reply.status(201).send(product);
  } catch (err) {
    if (err instanceof ItemAlreadyExistsError) {
      return reply.status(409).send({
        message: err.message,
      });
    }

    throw err;
  }
}
