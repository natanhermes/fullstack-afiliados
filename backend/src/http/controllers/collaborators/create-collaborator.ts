import { FastifyRequest, FastifyReply } from 'fastify';

import { z } from 'zod';
import { makeCreateCollaboratorUseCase } from '@/use-cases/factories/make-create-collaborator-use-case';

export async function createCollaborator(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const createProductBodySchema = z.object({
    type: z.string(),
    name: z.string(),
    comissionBalance: z.number().default(0),
  });

  const { name, type, comissionBalance } = createProductBodySchema.parse(
    req.body,
  );

  const createCollaboratorUseCase = makeCreateCollaboratorUseCase();

  const collab = await createCollaboratorUseCase.execute({
    name,
    type,
    comissionBalance,
  });

  return reply.status(201).send(collab);
}
